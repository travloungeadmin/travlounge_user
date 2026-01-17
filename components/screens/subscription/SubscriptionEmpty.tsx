import { ThemedText } from '@/components/common/ThemedText';
import Icon from '@/components/ui/icon';
import { moderateScale } from '@/lib/responsive-dimensions';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SubscriptionEmpty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Icon name="Empty" size={moderateScale(150)} />
      <ThemedText variant="body" color="gray500" style={styles.emptyText}>
        No subscriptions found
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(100),
  },
  emptyText: {
    marginTop: moderateScale(20),
  },
});

export default SubscriptionEmpty;
