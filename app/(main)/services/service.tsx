import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import Header from '@/components/header';
import PartnerTab from '@/components/service/partner-tab';
import ServiceListingItemCard from '@/components/service/ServiceListingItemCard';
import Icon from '@/components/ui/icon';
import { shadow } from '@/constants';
import { Box, Device, Row, Text, useSafeAreaInsets } from '@/core';
import { useTheme } from '@/hooks';
import { getCurrentLocation } from '@/modules/location';
import useSleepingPodCart from '@/modules/sleeping-pod';
import useUserStore from '@/modules/user';
import LocationPermissionView from '@/old/components/common/location-permission-view';
import { getServiceListQuery } from '@/services/query/service';
import { convertTimeTo12Hour, formatDateToDMY } from '@/utils/string';
import analytics from '@react-native-firebase/analytics';

const Toloo = () => {
  const { theme } = useTheme();
  const { service, name, sleepingPodData, is_travlounge } = useLocalSearchParams();
  const { topHeight, bottomHeight } = useSafeAreaInsets();
  const { latitude, longitude, isLocationPermissionGranted, place: currentPlace } = useUserStore();
  const { place, date, time, duration } = useSleepingPodCart();
  const [isPartner, setIsPartner] = React.useState(false);

  const getData = async () => {
    const id = await analytics().getAppInstanceId();
    console.log('App Instance ID: ', id);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const isAvailable =
    name === 'Hygeinic Washrooms' ||
    name === 'Sleeping Pod' ||
    name === 'Restaurant' ||
    name === 'Cafe' ||
    name === 'Car Wash' ||
    name === 'Petrol Pump' ||
    name === 'Travelmart' ||
    name === 'Resort' ||
    name === 'Buffet';

  const { data, isFetching } = getServiceListQuery({
    latitude,
    longitude,
    category: service,
    is_travlounge,
    isPartner,
    isAvailable,
  });

  React.useEffect(() => {
    if (isLocationPermissionGranted && !currentPlace) {
      getCurrentLocation();
    }
  }, [isLocationPermissionGranted, currentPlace]);

  const ListEmptyComponent = () => (
    <View
      style={[
        styles.emptyComponent,
        { height: Device.height - topHeight - 50 - bottomHeight || 20 },
      ]}>
      {isFetching ? (
        <LottieView
          source={require('@/old/assets/animation/loading.json')}
          style={styles.loadingAnimation}
          autoPlay
          loop
        />
      ) : (
        <Box style={styles.notFoundBox}>
          <Image
            contentFit="contain"
            source={require('@/assets/images/not-found.png')}
            style={styles.notFoundImage}
          />
          <Text preset="POP_14_M">
            No {name}
            {name === 'Hygeinic Washrooms' ? '' : 's'} found
          </Text>
        </Box>
      )}
    </View>
  );

  const listData = sleepingPodData ? JSON.parse(sleepingPodData) : null;

  const source = (name) => {
    switch (name) {
      case 'Car Wash':
        return require('@/assets/images/coming_soon_carwash.png');
      case 'Mechanic':
        return require('@/assets/images/coming_soon_mechanic.png');
      case 'Petrol Pump':
        return require('@/assets/images/coming_soon_petrolPump.png');
      case 'Resort':
        return require('@/assets/images/coming_soon_resort.png');
      case 'Buffet':
        return require('@/assets/images/coming_soon_buffet.png');

      default:
        return require('@/assets/images/coming_soon_make_a_trip.png');
    }
  };

  const handlePress = (item: any) =>
    router.navigate({
      pathname: '/services/service-details',
      params: {
        isPartner: item?.is_partner,
        serviceName: name,
        service: service,
        id: item.id,
        name: item.display_name,
        ...(!!sleepingPodData ? { isSleepingPod: true } : {}),
      },
    });

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
      <Header location title={name as string} back />
      {name !== 'Sleeping Pod' && !is_travlounge && isAvailable && (
        <PartnerTab
          service={name as string}
          isPartner={isPartner}
          onPressAllCafes={() => {
            if (isPartner) setIsPartner(false);
          }}
          onPressPartner={() => {
            if (!isPartner) setIsPartner(true);
          }}
        />
      )}
      {!!sleepingPodData && (
        <Pressable onPress={() => router.back()}>
          <Row style={[styles.sleepingPodRow, shadow, { backgroundColor: theme.backgroundCard }]}>
            <Box gap={8}>
              <Text preset="POP_16_SB" color="#333333">
                {place?.name}
              </Text>
              <Text preset="POP_14_R" color="rgba(51, 51, 51, 0.8)">
                {date && formatDateToDMY(date)} - {time && convertTimeTo12Hour(time)} - {duration}
                Hours - Pods
              </Text>
            </Box>
            <Icon name="Search" size={24} />
          </Row>
        </Pressable>
      )}
      {isAvailable ? (
        <FlatList
          data={listData ?? data}
          renderItem={({ item, index }) => {
            console.log(item);

            return (
              <ServiceListingItemCard
                images={item?.images}
                name={item.display_name}
                place={item.place}
                onPress={() => handlePress(item)}
                rating={item.average_rating || 5}
                distance={item.distance}
                isPartner={item.is_partner}
                offerPercentage={item.offer_percentage}
              />
              // <ServiceItem
              //   offerPercentage={item.offer_percentage}
              //   service={service}
              //   isSleepingPod={!!sleepingPodData}
              //   item={item}
              //   index={index}
              //   serviceName={name as string}
              // />
            );
          }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          contentContainerStyle={styles.flatListContent}
          ListFooterComponent={() => <View style={{ height: bottomHeight || 20 }} />}
          ListEmptyComponent={ListEmptyComponent}
        />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text preset="POP_28_B" color="#253D8F">
            Coming Soon!
          </Text>
          <Text preset="POP_16_SB" color="#253D8F">
            We are working for you
          </Text>
          <Image
            priority="high"
            source={source(name)}
            style={{
              width: Device.width,
              height: Device.width * 1.105,
            }}
            contentFit="contain"
          />
          <Pressable
            onPress={() => router.back()}
            style={{
              position: 'absolute',
              bottom: bottomHeight || 20,
              left: 20,
              alignSelf: 'flex-end',
              backgroundColor: '#253D8F',
              height: 48,
              width: Device.width - 40,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text preset="POP_16_SB" color="#FFF">
              Go To Home
            </Text>
          </Pressable>
        </View>
      )}
      {!isLocationPermissionGranted && <LocationPermissionView />}
    </View>
  );
};

export default Toloo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyComponent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  loadingAnimation: {
    width: '40%',
    height: '40%',
  },
  notFoundBox: {
    alignItems: 'center',
  },
  notFoundImage: {
    width: Device.width / 2,
    height: Device.width / 2,
  },

  flatListContent: {
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sleepingPodRow: {
    justifyContent: 'space-between',
    padding: 16,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
});
