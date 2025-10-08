import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "@/old/lib/responsive-dimensions";
import SearchBar from "@/old/components/make-a-trip/search-bar";
import MapViewCard from "@/old/components/make-a-trip/map-view-card";
import CouponCard from "@/old/components/make-a-trip/coupon-card";
import StationDetailCard from "@/old/components/make-a-trip/station-detail-card";
import { useLocalSearchParams } from "expo-router";
import CustomHeader from "@/old/components/common/custom-header";

const StopDetails = () => {
  const { data } = useLocalSearchParams();
  const detailsData = JSON.parse(data) ?? [];

  console.log("detailsData", detailsData);

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        isHome={false}
        title={"Details"}
        isBack={true}
        isWallet={true}
      />
      <ScrollView>
        <SafeAreaView
          edges={["bottom"]}
          style={{ paddingHorizontal: scale(15), gap: scale(20) }}
        >
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
