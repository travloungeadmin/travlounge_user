import { Text } from '@/core';
import { moderateScale } from '@/lib/responsive-dimensions';
import { useTheme } from '@/newTheme';
import { FilterOptionsResponse } from '@/types/api/used-cars.types';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface FilterBarProps {
  filters?: FilterOptionsResponse;
  selectedFilters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  openFilterModal?: () => void;
}

const FilterBar = ({
  filters,
  selectedFilters,
  onFilterChange,
  openFilterModal,
}: FilterBarProps) => {
  const { theme } = useTheme();

  if (!filters) return null;

  const renderFilterChip = (label: string, isActive: boolean, onPress: () => void) => (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: isActive ? theme.primary : theme.white,
          borderColor: isActive ? theme.primary : theme.gray400,
        },
      ]}
      onPress={onPress}>
      <Text style={[styles.chipText, { color: isActive ? theme.white : theme.gray900 }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={[styles.filterButton, { borderColor: theme.gray300 }]}
          onPress={openFilterModal}>
          <Text>Filter</Text>
        </TouchableOpacity>

        {/* Example Chips - we can enhance this to show specific quick filters */}
        {filters.fuel_types.map((fuel) =>
          renderFilterChip(fuel, selectedFilters.fuel === fuel, () =>
            onFilterChange('fuel', fuel === selectedFilters.fuel ? '' : fuel)
          )
        )}

        {filters.transmission_types.map((trans) =>
          renderFilterChip(trans, selectedFilters.transmission === trans, () =>
            onFilterChange('transmission', trans === selectedFilters.transmission ? '' : trans)
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(10),
  },
  scrollContent: {
    paddingHorizontal: moderateScale(12),
    gap: moderateScale(8),
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipText: {
    fontSize: moderateScale(12),
  },
  filterButton: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    marginRight: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FilterBar;
