import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { SubscriptionTransaction } from '@/types/api/subscription.types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface HistoryItemProps {
  item: SubscriptionTransaction;
}

const HistoryItem = ({ item }: HistoryItemProps) => {
  return (
    <ThemedView backgroundColor="white" style={styles.historyItem}>
      <View style={styles.contentContainer}>
        <ThemedText variant="titleSmall" color="gray900">
          {item.title}
        </ThemedText>
        <ThemedText variant="bodySmall" color="gray500">
          {item.location} • {item.date_display}
        </ThemedText>
      </View>
      <ThemedText variant="titleSmallEmphasized" color="gray900">
        ₹{item.total_amount}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    marginHorizontal: SPACING.screenPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    paddingVertical: moderateScale(4),
  },
  contentContainer: {
    flex: 1,
  },
});

export default HistoryItem;
