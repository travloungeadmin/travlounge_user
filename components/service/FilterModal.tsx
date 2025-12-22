import { Text } from '@/core';
import { moderateScale } from '@/lib/responsive-dimensions';
import { useTheme } from '@/newTheme';
import { FilterOptionsResponse } from '@/types/api/used-cars.types';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  filters?: FilterOptionsResponse;
  selectedFilters: Record<string, any>;
  onApply: (filters: Record<string, any>) => void;
  onClear: () => void;
}

const { height, width } = Dimensions.get('window');

const SIDEBAR_WIDTH = width * 0.35;

type FilterCategory =
  | 'Budget'
  | 'Brand & Model'
  | 'Year'
  | 'Kilometre Driven'
  | 'Fuel Type'
  | 'Body Type'
  | 'Transmission'
  | 'Ownership'
  | 'Seats'
  | 'RTO'
  | 'Colours';

const CATEGORIES: { id: FilterCategory; label: string }[] = [
  { id: 'Budget', label: 'Budget' },
  { id: 'Brand & Model', label: 'Brand & Model' },
  { id: 'Year', label: 'Year' },
  { id: 'Kilometre Driven', label: 'Kilometre Driven' },
  { id: 'Fuel Type', label: 'Fuel Type' },
  // { id: 'Body Type', label: 'Body Type' }, // Not in API
  { id: 'Transmission', label: 'Transmission' },
  { id: 'Ownership', label: 'Ownership' },
  { id: 'Seats', label: 'Seats' },
  { id: 'RTO', label: 'RTO' },
  { id: 'Colours', label: 'Colours' },
];

const BUDGET_RANGES = [
  { label: 'Below 3 lakh', min: 0, max: 300000 },
  { label: '3 - 6 lakh', min: 300000, max: 600000 },
  { label: '6 - 10 lakh', min: 600000, max: 1000000 },
  { label: '10 - 15 lakh', min: 1000000, max: 1500000 },
  { label: '15 lakh and Above', min: 1500000, max: undefined },
];

const FilterModal = ({
  isVisible,
  onClose,
  filters,
  selectedFilters,
  onApply,
  onClear,
}: FilterModalProps) => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('Budget');
  const [tempFilters, setTempFilters] = useState(selectedFilters);

  React.useEffect(() => {
    if (isVisible) {
      setTempFilters(selectedFilters);
    }
  }, [isVisible, selectedFilters]);

  const handleFilterChange = (key: string, value: any) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSelection = (key: string, value: any, isMultiple = false) => {
    // For now, simpler toggle for single select properties that might need clear
    // Or if we want multi-select array? API seems to take single strings for most?
    // "fuel" param in getUsedCarsApi seems to be string. but maybe comma separated?
    // Let's assume single select for now as per previous implementation to be safe,
    // or check if we supported multi-select logic before (it was replacing value).
    // If we want multi, we need to manage arrays. Let's stick to single value replacement
    // as per existing logic, but allow toggling off.
    const current = tempFilters[key];
    const newValue = current === value ? undefined : value;
    handleFilterChange(key, newValue);
  };

  const renderBudgetSection = () => {
    const currentMin = tempFilters.min_price;
    const currentMax = tempFilters.max_price;

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.sectionTitle, { color: theme.gray900 }]}>
          Choose from options below
        </Text>
        <View style={styles.chipWrapper}>
          {BUDGET_RANGES.map((range, index) => {
            const isActive = currentMin === range.min && currentMax === range.max;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.chip,
                  isActive && { backgroundColor: theme.primary50, borderColor: theme.primary },
                ]}
                onPress={() => {
                  handleFilterChange('min_price', range.min);
                  handleFilterChange('max_price', range.max);
                }}>
                <Text
                  style={[styles.chipText, { color: isActive ? theme.primary : theme.gray700 }]}>
                  {range.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.gray900, marginTop: moderateScale(24) }]}>
          Choose a range below
        </Text>

        {/* Custom Range Inputs since we use @react-native-community/slider which is single thumb */}
        <View style={styles.priceContainer}>
          <View
            style={[
              styles.priceInputContainer,
              { borderColor: theme.gray300, backgroundColor: theme.gray50 },
            ]}>
            <TextInput
              style={[styles.priceInput, { color: theme.gray900 }]}
              placeholder="Min"
              placeholderTextColor={theme.gray400}
              keyboardType="numeric"
              value={tempFilters.min_price ? String(tempFilters.min_price) : ''}
              onChangeText={(text) =>
                handleFilterChange('min_price', text ? Number(text) : undefined)
              }
            />
          </View>
          <Text style={{ color: theme.gray500 }}>to</Text>
          <View
            style={[
              styles.priceInputContainer,
              { borderColor: theme.gray300, backgroundColor: theme.gray50 },
            ]}>
            <TextInput
              style={[styles.priceInput, { color: theme.gray900 }]}
              placeholder="Max"
              placeholderTextColor={theme.gray400}
              keyboardType="numeric"
              value={tempFilters.max_price ? String(tempFilters.max_price) : ''}
              onChangeText={(text) =>
                handleFilterChange('max_price', text ? Number(text) : undefined)
              }
            />
          </View>
        </View>

        {/* Optionally add a simple slider for Max Price if user sets Min to 0?
                   Or just leave as inputs which is more precise.
                   User's image showed a specific vertical slider, which is hard to replicate quickly.
                   We'll stick to inputs + chips for robustness.
               */}
      </ScrollView>
    );
  };

  const renderChipsSection = (
    data: any[],
    key: string,
    labelExtractor?: (item: any) => string,
    valueExtractor?: (item: any) => any
  ) => {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.sectionTitle, { color: theme.gray900 }]}>Choose {key}</Text>
        <View style={styles.chipWrapper}>
          {data?.map((item, index) => {
            const label = labelExtractor ? labelExtractor(item) : item;
            const value = valueExtractor ? valueExtractor(item) : item;
            const isSelected = tempFilters[key] === value;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.chip,
                  isSelected && { backgroundColor: theme.primary50, borderColor: theme.primary },
                ]}
                onPress={() => toggleSelection(key, value)}>
                <Text
                  style={[styles.chipText, { color: isSelected ? theme.primary : theme.gray700 }]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  const renderCheckboxSection = (data: any[], key: string, labelKey: string = 'make') => {
    // Specifically for Brand & Model which might have checks
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.sectionTitle, { color: theme.gray900 }]}>Choose {key}</Text>
        <View style={styles.listContainer}>
          {data?.map((item, index) => {
            const label = typeof item === 'string' ? item : item[labelKey];
            const value = typeof item === 'string' ? item : item[labelKey]; // Or item.id?
            // Assuming we filter by name for now as params usually take string
            const isSelected = tempFilters[key] === value;

            return (
              <TouchableOpacity
                key={index}
                style={styles.listItem}
                onPress={() => toggleSelection(key, value)}>
                <View
                  style={[
                    styles.checkbox,
                    isSelected && { backgroundColor: theme.primary, borderColor: theme.primary },
                    !isSelected && { borderColor: theme.gray400 },
                  ]}>
                  {isSelected && <AntDesign name="check" size={12} color={theme.white} />}
                </View>
                <Text style={[styles.listItemText, { color: theme.gray900 }]}>{label}</Text>
                {/* Show count if available? item.count */}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  const renderContent = () => {
    if (!filters) return null;

    switch (selectedCategory) {
      case 'Budget':
        return renderBudgetSection();
      case 'Brand & Model':
        return renderCheckboxSection(filters.car_makes, 'brand_model', 'make');
      case 'Year':
        // Render generic chips for now or inputs? Let's use generic chips if API gave ranges or just inputs
        // API gave `year_range`: { min, max }
        // We can show inputs for Year Min/Max
        return (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={[styles.sectionTitle, { color: theme.gray900 }]}>Year Range</Text>
            <View style={styles.priceContainer}>
              <TextInput
                style={[styles.input, { borderColor: theme.gray300, color: theme.gray900 }]}
                placeholder="Min Year"
                placeholderTextColor={theme.gray400}
                keyboardType="numeric"
                value={tempFilters.year_min ? String(tempFilters.year_min) : ''}
                onChangeText={(t) => handleFilterChange('year_min', t ? Number(t) : undefined)}
              />
              <TextInput
                style={[styles.input, { borderColor: theme.gray300, color: theme.gray900 }]}
                placeholder="Max Year"
                placeholderTextColor={theme.gray400}
                keyboardType="numeric"
                value={tempFilters.year_max ? String(tempFilters.year_max) : ''}
                onChangeText={(t) => handleFilterChange('year_max', t ? Number(t) : undefined)}
              />
            </View>
          </ScrollView>
        );
      case 'Kilometre Driven':
        // API: kms_range {min, max}
        return (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={[styles.sectionTitle, { color: theme.gray900 }]}>Kilometers Driven</Text>
            <View style={styles.priceContainer}>
              <TextInput
                style={[styles.input, { borderColor: theme.gray300, color: theme.gray900 }]}
                placeholder="Min KMS"
                placeholderTextColor={theme.gray400}
                keyboardType="numeric"
                value={tempFilters.kms_min ? String(tempFilters.kms_min) : ''}
                onChangeText={(t) => handleFilterChange('kms_min', t ? Number(t) : undefined)}
              />
              <TextInput
                style={[styles.input, { borderColor: theme.gray300, color: theme.gray900 }]}
                placeholder="Max KMS"
                placeholderTextColor={theme.gray400}
                keyboardType="numeric"
                value={tempFilters.kms_max ? String(tempFilters.kms_max) : ''}
                onChangeText={(t) => handleFilterChange('kms_max', t ? Number(t) : undefined)}
              />
            </View>
          </ScrollView>
        );
      case 'Fuel Type':
        return renderChipsSection(filters.fuel_types, 'fuel');
      case 'Transmission':
        return renderChipsSection(filters.transmission_types, 'transmission');
      case 'Ownership':
        return renderChipsSection(filters.ownership_types, 'ownership');
      case 'Seats':
        return renderChipsSection(filters.seats, 'seats', (item) => `${item} Seats`);
      case 'RTO':
        return renderChipsSection(filters.places, 'place'); // Assuming RTO maps to place filters? or add separate RTO field if exists
      case 'Colours':
        return renderChipsSection(filters.colours, 'color'); // Map 'colours'->'color' query param? Verify param name
      default:
        return (
          <View style={{ padding: 20 }}>
            <Text style={{ color: theme.gray500 }}>Select a category</Text>
          </View>
        );
    }
  };

  if (!filters) return null;

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
        <TouchableWithoutFeedback>
          <View style={[styles.container, { backgroundColor: theme.white }]}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: theme.gray900 }]}>Filter</Text>
              <TouchableOpacity onPress={onClose}>
                <AntDesign name="close-circle" size={24} color={theme.gray500} />
              </TouchableOpacity>
            </View>

            <View style={styles.body}>
              {/* Sidebar */}
              <View style={[styles.sidebar, { backgroundColor: theme.gray50 }]}>
                <FlatList
                  data={CATEGORIES}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    const isSelected = selectedCategory === item.id;
                    return (
                      <TouchableOpacity
                        style={[
                          styles.sidebarItem,
                          isSelected && {
                            backgroundColor: theme.white,
                            borderLeftWidth: 4,
                            borderLeftColor: theme.primary,
                          },
                        ]}
                        onPress={() => setSelectedCategory(item.id)}>
                        <Text
                          style={[
                            styles.sidebarText,
                            { color: theme.gray700 },
                            isSelected && { color: theme.gray900, fontWeight: '700' },
                          ]}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              {/* Main Content */}
              <View style={[styles.mainContent, { backgroundColor: theme.white }]}>
                {renderContent()}
              </View>
            </View>

            <View style={[styles.footer, { borderTopColor: theme.gray200 }]}>
              <TouchableOpacity
                style={[styles.footerButton, { backgroundColor: theme.white }]}
                onPress={onClear}>
                <Text style={[styles.footerButtonText, { color: theme.gray700 }]}>
                  Clear Filter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.footerButton, { backgroundColor: theme.primary }]}
                onPress={() => {
                  onApply(tempFilters);
                  onClose();
                }}>
                <Text style={[styles.footerButtonText, { color: theme.white }]}>Show Cars</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    height: height * 0.9,
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  sidebarItem: {
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(12),
  },
  sidebarText: {
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
  },
  contentContainer: {
    padding: moderateScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginBottom: moderateScale(12),
  },
  chipWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(8),
  },
  chip: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: moderateScale(8),
  },
  chipText: {
    fontSize: moderateScale(12),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
  },
  priceInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
  },
  priceInput: {
    fontSize: moderateScale(14),
    padding: 0,
  },
  listContainer: {
    gap: moderateScale(16),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
  },
  checkbox: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(4),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemText: {
    fontSize: moderateScale(14),
  },
  footer: {
    flexDirection: 'row',
    padding: moderateScale(16),
    borderTopWidth: 1,
    gap: moderateScale(12),
  },
  footerButton: {
    flex: 1,
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  footerButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
});

export default FilterModal;
