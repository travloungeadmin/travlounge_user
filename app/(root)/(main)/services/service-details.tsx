import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';

import AssociationList from '@/components/dashboard/association-list';
import Header from '@/components/header';
import CafeCard from '@/components/service/cafe-card';
import DistanceCard from '@/components/service/distance-card';
import FacilitiesCard from '@/components/service/facilities-card';
import Reels from '@/components/service/reels';
import ReviewCard from '@/components/service/review-card';
import ServiceDetailCard from '@/components/service/service-detail-card';
import { BookingFooter } from '@/components/service/service-details/booking-footer';
import { convertDistance, convertTime } from '@/components/service/service-details/utils';
import SleepingPodBookingView from '@/components/service/sleeping-pod-booking-view';
import { Box, Text, useSafeAreaInsets } from '@/core';
import { showError } from '@/lib/toast';
import useSleepingPodCart from '@/modules/sleeping-pod';
import useUserStore from '@/modules/user';
import Loading from '@/old/components/common/Loading';
import { getAvailabilitySleepingPod, getServiceDetailsQuery } from '@/services/query/service';
import { colors } from '@/theme';
import type { ServiceDetailsParams } from '@/types/screens/services/service-details.types';
import analytics from '@react-native-firebase/analytics';

const ServiceDetails = () => {
  const params = useLocalSearchParams<ServiceDetailsParams>();
  const { user } = useUserStore();

  console.log('/////////', user);

  const { id, name, isSleepingPod, serviceName, isPartner } = params;
  const isTravloungePartner = isPartner === 'true';
  const isCarwash = serviceName === 'Car Wash';
  const isCafe = serviceName === 'Cafe';
  const isBuffet = serviceName === 'Buffet';
  const { date, list_of_pods, duration, time } = useSleepingPodCart();
  const { latitude, longitude, isProfileComplete } = useUserStore();
  const totalExtraBaths = list_of_pods.reduce((sum, pod) => sum + pod.noOfExtraBaths, 0);
  const [priceData, setPriceData] = React.useState<any>(null);

  const { data, isLoading, refetch } = getServiceDetailsQuery({
    id,
    longitude,
    latitude,
  });

  const { bottomHeight } = useSafeAreaInsets();

  const pod_info = list_of_pods.map((pod) => ({
    pod_type: pod.type,
    number_of_pods: pod.number_of_pods,
    duration,
    is_bath: pod?.is_bath,
    is_restroom: pod?.is_restroom,
  }));

  const { data: priceDetails, refetch: refetchPriceData } = getAvailabilitySleepingPod({
    isSleepingPod,
    date,
    listing_id: id,
    pod_info,
    time,
    add_ons: {
      no_of_bath: totalExtraBaths,
    },
  });

  React.useEffect(() => {
    if (priceDetails) {
      setPriceData(priceDetails);
    }
    if (pod_info.length === 0) {
      setPriceData(null);
      showError('Error', 'Please select at least one pod');
    }
  }, [priceDetails, list_of_pods]);

  React.useEffect(() => {
    if (priceData?.is_unavailable) {
      showError(
        'Whoops!',
        priceData?.message || 'No Pods Available for This Date. Select a new date.'
      );
    }
  }, [priceData]);

  useEffect(() => {
    analytics().logEvent('visited_listing', {
      user_id: String(user?.id || ''),
      user_name: user?.name || '',
      user_phone: user?.mobile_number || '',
      listing_id: id,
      listing_name: name,
      listing_type: serviceName || '',
      is_partner: isTravloungePartner || false,
    });
  }, [id, name, serviceName, isTravloungePartner]);

  useFocusEffect(
    React.useCallback(() => {
      if (!isSleepingPod && data) {
        refetch();
      }
    }, [data, refetch, isSleepingPod])
  );

  const associationList = data?.offer_images?.map((item: { image: string; title: string }) => ({
    ...item,
    title: data?.display_name,
  }));

  const noOfPods = list_of_pods.reduce((acc, pod) => acc + pod.number_of_pods, 0);

  const handleBookNow = () => {
    const pod_info = list_of_pods.map((pod) => ({
      pod_type: pod.type,
      number_of_pods: pod.number_of_pods,
      duration,
      is_bath: pod?.is_bath,
      is_restroom: pod?.is_restroom,
    }));

    if (priceData?.is_unavailable) {
      router.navigate('/services/sleeping-pod');
      return;
    }
    router.navigate({
      pathname: '/services/sleeping-pod-payment',
      params: {
        id,
        image: data?.images?.[0]?.image,
        name: data?.display_name,
        location: data?.place,
        priceData: JSON.stringify(priceData),
        date,
        duration,
        time,
        list_of_pods: JSON.stringify(pod_info),
        no_of_baths: totalExtraBaths,
      },
    });
  };

  return (
    <Box style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
      <Header title={name} back style={{ zIndex: 1, top: 0, right: 0, left: 0 }} />

      {!data && isLoading && <Loading />}

      {data && (
        <ScrollView>
          <ServiceDetailCard
            description={data?.description}
            images={data?.images}
            name={data?.display_name}
            location={data?.place}
            rating={data?.average_rating || 5}
          />
          {isSleepingPod && duration >= 6 && <FacilitiesCard />}
          <AssociationList data={associationList} />
          {data?.videos?.length > 0 ? <Reels header={name} videos={data?.videos} /> : null}
          {/* {!isSleepingPod && (
            <CouponCodeCard
              description={data?.offer_data?.description}
              title={data?.offer_data?.title}
              id={parseInt(id)}
            />
          )} */}
          {(isCafe || isBuffet) && data?.is_partner && <CafeCard service={serviceName} />}
          {convertDistance(data?.distance) && convertTime(data?.time_to_loc) && (
            <DistanceCard
              distance={convertDistance(data?.distance)}
              time={convertTime(data?.time_to_loc)}
              latitude={data?.latitude}
              longitude={data?.longitude}
            />
          )}
          {isSleepingPod && <SleepingPodBookingView priceData={priceData} />}
          <ReviewCard
            id={id}
            image={data?.images?.[0]?.image || ''}
            name={data?.display_name}
            location={data?.place}
            averageRating={data?.average_rating}
            reviews={data?.reviews}
          />
          <Box style={{ height: bottomHeight || 20 }} />
        </ScrollView>
      )}
      {isSleepingPod &&
        (priceData?.subtotal || priceData?.is_unavailable) &&
        pod_info.length > 0 && (
          <BookingFooter
            isUnavailable={priceData?.is_unavailable}
            date={date}
            noOfPods={noOfPods}
            price={priceData?.subtotal}
            bottomHeight={bottomHeight}
            onBook={handleBookNow}
          />
        )}
      {isCarwash && isTravloungePartner ? (
        <View style={{ padding: 16, backgroundColor: '#fff', paddingBottom: bottomHeight || 20 }}>
          <Pressable
            style={{
              height: 44,
              backgroundColor: '#253D8F',
              borderRadius: 44,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              if (!isProfileComplete) {
                Alert.alert(
                  'Profile Incomplete',
                  'Please complete your profile to proceed with booking.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Complete Profile',
                      onPress: () =>
                        router.navigate({
                          pathname: '/(root)/(main)/old/edit-profile',
                          params: { type: 'edit' },
                        }),
                    },
                  ]
                );
                return;
              }
              router.navigate({
                pathname: '/services/car-wash',
                params: {
                  id,
                  header: data?.display_name,
                  place: data?.place,
                  image: data?.images?.[0]?.image,
                },
              });
            }}>
            <Text preset="POP_16_SB" color="#FFF">
              Book Now
            </Text>
          </Pressable>
        </View>
      ) : null}
    </Box>
  );
};

export default ServiceDetails;
