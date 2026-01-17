import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import React from 'react';
import { StyleSheet } from 'react-native';

interface HistorySectionHeaderProps {
  month: string;
}

const HistorySectionHeader = ({ month }: HistorySectionHeaderProps) => {
  return (
    <ThemedView backgroundColor="white" style={styles.sectionHeader}>
      <ThemedText variant="bodySmall" color="gray500">
        {month}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    marginHorizontal: SPACING.screenPadding,
    paddingHorizontal: SPACING.screenPadding,
    paddingVertical: moderateScale(8),
    backgroundColor: 'white',
  },
});

export default HistorySectionHeader;
