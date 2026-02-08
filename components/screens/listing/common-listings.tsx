import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/common/ThemedText';
import PartnerTab from '@/components/service/partner-tab';
import ServiceListingItemCard from '@/components/service/ServiceListingItemCard';
import ServiceListingItemCardSkeleton from '@/components/service/ServiceListingItemCardSkeleton';
import Icon from '@/components/ui/icon';

import { Device } from '@/core';
import { useLocation, useTheme } from '@/hooks';

import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { ServiceItem } from '@/services/api/types/listings';
import { getServiceListQuery } from '@/services/query/service';
import useServiceStore from '@/store/service';

const CommonListings = () => {
  const { theme } = useTheme();
  const { id, name } = useLocalSearchParams();
  const [isPartner, setIsPartner] = React.useState(false);
  const { services } = useServiceStore();
  const service = services.find((item) => item.id === Number(id))?.title;
  const { coords } = useLocation();

  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = getServiceListQuery({
    latitude: coords?.latitude ?? 0,
    longitude: coords?.longitude ?? 0,
    category: String(id) || '',
    is_travlounge: false,
    is_partner: isPartner,
  });

  const ListEmptyComponent = () => {
    if (isFetching) {
      return <ServiceListingItemCardSkeleton />;
    }
    return (
      <View style={styles.emptyComponent}>
        <Icon size={Device.width / 2} name="Empty" />
        <ThemedText
          style={{ width: Device.width / 2, textAlign: 'center' }}
          variant="bodyLargeEmphasized"
          color="gray900">
          No {service}s found
        </ThemedText>
      </View>
    );
  };

  const handlePress = (item: ServiceItem) => {
    router.push({
      pathname: '/listings/listing-details',
      params: {
        isPartner: String(item.is_partner),
        category: service,
        id: item.id,
        name: item.display_name,
        category_id: id,
        category_name: name,
      },
    });
  };

  return (
    <View style={[styles.container]}>
      <PartnerTab
        isPartner={isPartner}
        onPressAllCafes={() => {
          if (isPartner) setIsPartner(false);
        }}
        onPressPartner={() => {
          if (!isPartner) setIsPartner(true);
        }}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => {
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
          );
        }}
        keyExtractor={(item) => item.id}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.flatListContent}
        ListFooterComponent={
          <View
            style={{ paddingVertical: SPACING.screenPadding, paddingBottom: SPACING.screenBottom }}>
            {isFetchingNextPage && <ActivityIndicator size="small" color={theme.gray900} />}
          </View>
        }
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default CommonListings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACING.screenPadding,
  },
  emptyComponent: {
    flex: 1,
    gap: SPACING.screenPadding,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexGrow: 1,
    gap: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingBottom: SPACING.screenBottom,
  },
  sleepingPodRow: {
    justifyContent: 'space-between',
    padding: moderateScale(16),
    paddingVertical: moderateScale(8),
    alignItems: 'center',
    margin: moderateScale(16),
    borderRadius: moderateScale(8),
  },
});
