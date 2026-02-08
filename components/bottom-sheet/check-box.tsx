import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import Icon from '../ui/icon';

const capitalizeFirstLetter = (string: string) =>
  string?.charAt(0)?.toUpperCase() + string?.slice(1);

type PropsType = {
  label: string | number;
  onSelect: (value: string | number, index: string | number, id: string | number) => void;
  selectedValue?: string | number | [] | string[] | number[] | null;
  selectedIndex?: number | [] | string | string[] | number[] | null;
  selectedId?: number | [] | string | string[] | number[] | null;
  index?: number;
  enableMultiSelect?: boolean;
  borderDisabled?: boolean;
  id?: string | number;
  description?: string;
};

const CheckBox = (props: PropsType) => {
  const {
    borderDisabled,
    description,
    enableMultiSelect,
    id,
    index,
    label,
    onSelect,
    selectedId = null,
    selectedIndex = null,
    selectedValue = null,
  } = props;
  const { theme } = useTheme();

  const isSelected = enableMultiSelect
    ? selectedIndex?.includes(index) || selectedId?.includes(id)
    : selectedValue === label || selectedIndex === index || selectedId === id;

  const selectedStyle = isSelected
    ? {
        backgroundColor: enableMultiSelect ? theme.primary : 'transparent',
        borderColor: theme.primary,
        borderWidth: moderateScale(6),
      }
    : { borderColor: theme.gray700, borderWidth: 2 };

  const borderWidth = !borderDisabled && {
    borderTopWidth: index === 0 ? 0 : 1,
    flex: 1,
  };

  return (
    <TouchableOpacity onPress={() => onSelect(label, index, id)} style={styles.touchable}>
      <View style={[styles.view, selectedStyle]}>
        {enableMultiSelect && isSelected && (
          <Icon stroke="#FFF" name="Check" size={moderateScale(13)} />
        )}
      </View>
      <View style={[styles.viewWithBorder, borderWidth]}>
        <ThemedText style={description ? undefined : styles.text} variant="body" color="gray900">
          {capitalizeFirstLetter(label)}
        </ThemedText>
        {description && (
          <ThemedText style={styles.description} variant="bodySmall" color="gray600">
            {description}
          </ThemedText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  description: {
    fontSize: moderateScale(15),
    fontWeight: '400',
    lineHeight: moderateScale(20),
  },
  text: {
    fontSize: moderateScale(15),
    fontWeight: '400',
    lineHeight: moderateScale(20),
  },
  touchable: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: moderateScale(15),
    paddingHorizontal: moderateScale(16),
  },
  view: {
    alignItems: 'center',
    borderRadius: moderateScale(11),
    height: moderateScale(22),
    justifyContent: 'center',
    width: moderateScale(22),
  },
  viewWithBorder: {
    borderTopColor: 'rgba(28, 28, 30, 0.3)',
    paddingVertical: moderateScale(14),
  },
});
