import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import CouponCodeCard from '@/components/coupon-code-card';
import MapViewCard from '@/components/make-a-trip/map-view-card';
import StationCard from '@/components/make-a-trip/station-card';
import { Box } from '@/core';
import CustomHeader from '@/old/components/common/custom-header';
import { colors } from '@/theme';
import { useLocalSearchParams } from 'expo-router';

const Station = () => {
  const { data } = useLocalSearchParams();
  const detailsData = JSON.parse(data) ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
      <CustomHeader
        isHome={false}
        title={detailsData?.listing.contact_name}
        isBack={true}
        isWallet={true}
      />
      <ScrollView>
        <MapViewCard isStarted={true} />
        <Box style={{ paddingVertical: 16, gap: 16 }}>
          <StationCard item={detailsData} />
          <CouponCodeCard />
        </Box>
        {/* <SearchBar />
          <MapViewCard />
          <StationDetailCard
            distance={detailsData.distance}
            location={detailsData.listing.place}
            stopName={detailsData.listing.contact_name}
            offers={detailsData.offers}
            images={detailsData.listing.image}
          /> */}
        {/* <CouponCard couponCode="ADEFRGTD25235" /> */}
      </ScrollView>
    </View>
  );
};

export default Station;

const styles = StyleSheet.create({});
