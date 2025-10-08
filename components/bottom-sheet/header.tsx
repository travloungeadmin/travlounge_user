import { moderateScale } from '@/core/responsive-dimensions';
import { colors } from '@/theme';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';




type PropsType = {
  title: string;
  headerRight?: React.ReactNode;
  onPressClear?: () => void;
  style?: StyleProp<ViewStyle>;
};

const Header = (props: PropsType) => {
  const {  headerRight, onPressClear, style, title, } = props;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
        {headerRight ||
          (onPressClear && (
            <Text onPress={onPressClear} style={styles.clearAll}>
              Clear All
            </Text>
          ))}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  clearAll: {
    color: 'rgba(0, 87, 192, 1)', // #0057C0 in rgba
    fontSize: moderateScale(14),
  },
  container: {
    borderBottomWidth: 1,
    borderColor: 'rgba(28, 28, 30, 0.3)', // #1C1C1E in rgba
    padding: moderateScale(15),
    paddingHorizontal: moderateScale(16),
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    marginBottom: 0,
    marginTop: moderateScale(10),
  },
  title: {
    color: colors.textPrimary,
    fontSize: moderateScale(17),
    fontWeight: '600',
  },
});
