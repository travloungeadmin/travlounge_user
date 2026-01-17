import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { Ionicons, Octicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

interface HistorySearchHeaderProps {
  onFilterPress: () => void;
  filterLabel: string;
}

const HistorySearchHeader = ({ onFilterPress, filterLabel }: HistorySearchHeaderProps) => {
  const { theme } = useTheme();

  return (
    <ThemedView backgroundColor="white" style={styles.historySection}>
      <View style={styles.historyHeader}>
        <Octicons name="arrow-switch" size={moderateScale(20)} color={theme.gray900} />
        <ThemedText variant="titleSmallEmphasized" color="gray900">
          Usage History
        </ThemedText>
      </View>

      <Pressable onPress={onFilterPress}>
        <ThemedView backgroundColor="primary50" style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={theme.gray500} />
          <TextInput
            editable={false}
            style={[styles.searchInput, { color: theme.gray900 }]}
            placeholder="Last three months"
            placeholderTextColor={theme.gray500}
            value={filterLabel}
            onPressIn={onFilterPress}
          />
          <Ionicons name="calendar-outline" size={20} color={theme.gray500} />
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  historySection: {
    borderTopRightRadius: moderateScale(8),
    borderTopLeftRadius: moderateScale(8),
    marginHorizontal: SPACING.screenPadding,
    paddingHorizontal: SPACING.screenPadding,
    gap: moderateScale(16),
    paddingTop: moderateScale(12),
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(12),
    gap: moderateScale(8),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(14),
  },
});

export default HistorySearchHeader;
