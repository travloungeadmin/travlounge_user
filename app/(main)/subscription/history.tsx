import React, { useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

import SingleSelectList from '@/components/bottom-sheet/single-select-list';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { ThemedView } from '@/components/common/ThemedView';
import ActivePlansSection from '@/components/screens/subscription/history/ActivePlansSection';
import HistoryItem from '@/components/screens/subscription/history/HistoryItem';
import HistoryListEmpty from '@/components/screens/subscription/history/HistoryListEmpty';
import HistorySearchHeader from '@/components/screens/subscription/history/HistorySearchHeader';
import HistorySectionHeader from '@/components/screens/subscription/history/HistorySectionHeader';
import BottomSheet from '@/core/bottom-sheet';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import {
  useGetSubscriptionHistoryQuery,
  useGetSubscriptionQuery,
} from '@/services/query/subscription';
import { SUBSCRIPTION_HISTORY_FILTER_OPTIONS } from '@/utils/subscription';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const SubscriptionHistory = () => {
  const filterRef = React.useRef<BottomSheetModal>(null);
  const [filter, setFilter] = useState('last_3_months');
  const [filterLabel, setFilterLabel] = useState('Last three months');
  const { data: subscriptionData, isLoading } = useGetSubscriptionQuery();
  const { data: historyData, isLoading: isHistoryLoading } = useGetSubscriptionHistoryQuery();

  const handleFilterPress = () => {
    filterRef.current?.present();
  };

  const renderHeader = () => (
    <View>
      <ActivePlansSection isLoading={isLoading} activeSubscriptions={subscriptionData} />
      <HistorySearchHeader onFilterPress={handleFilterPress} filterLabel={filterLabel} />
    </View>
  );

  return (
    <ScreenWrapper>
      <SectionList
        sections={
          historyData?.transactions_by_month.map((section) => ({
            ...section,
            data: section.transactions,
          })) || []
        }
        keyExtractor={(item) => item.transaction_id}
        renderItem={({ item }) => <HistoryItem item={item} />}
        renderSectionHeader={({ section: { month } }: { section: any }) => (
          <HistorySectionHeader month={month} />
        )}
        ListHeaderComponent={renderHeader}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => (
          <ThemedView backgroundColor="white" style={styles.separatorContainer}>
            <ThemedView backgroundColor="gray200" style={styles.separator} />
          </ThemedView>
        )}
        ListFooterComponent={() => <ThemedView backgroundColor="white" style={styles.footer} />}
        ListEmptyComponent={() => <HistoryListEmpty isLoading={isHistoryLoading} />}
      />

      <BottomSheet ref={filterRef} enableDynamicSizing>
        <SingleSelectList
          data={SUBSCRIPTION_HISTORY_FILTER_OPTIONS}
          headerTitle="Filter History"
          selectedId={filter}
          onSelect={(val: string, index: number, id: string) => {
            setFilter(id);
            setFilterLabel(val);
            filterRef.current?.dismiss();
          }}
        />
      </BottomSheet>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: SPACING.screenBottom,
  },
  separatorContainer: {
    height: moderateScale(12),
    marginHorizontal: SPACING.screenPadding,
    paddingHorizontal: moderateScale(12),
    justifyContent: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
  footer: {
    height: moderateScale(20),
    marginHorizontal: SPACING.screenPadding,
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
  },
});

export default SubscriptionHistory;
