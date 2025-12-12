import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { moderateScale } from '@/lib/responsive-dimensions';
import CustomHeader from '@/old/components/common/custom-header';
import MapViewCard from '@/old/components/make-a-trip/map-view-card';
import SearchBar from '@/old/components/make-a-trip/search-bar';
import StationDetailCard from '@/old/components/make-a-trip/station-detail-card';
import { useLocalSearchParams } from 'expo-router';

const StopDetails = () => {
  const { data } = useLocalSearchParams();
  const detailsData = JSON.parse(data) ?? [];

  console.log('detailsData', detailsData);

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader isHome={false} title={'Details'} isBack={true} isWallet={true} />
      <ScrollView>
        <SafeAreaView
          edges={['bottom']}
          style={{ paddingHorizontal: moderateScale(15), gap: moderateScale(20) }}>
          <SearchBar />
          <MapViewCard />
          <StationDetailCard
            distance={detailsData.distance}
            location={detailsData.listing.place}
            stopName={detailsData.listing.contact_name}
            offers={detailsData.offers}
            images={detailsData.listing.image}
          />
          {/* <CouponCard couponCode="ADEFRGTD25235" /> */}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default StopDetails;

const styles = StyleSheet.create({});
