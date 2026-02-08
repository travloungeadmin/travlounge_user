import { ContentPlaceholder, Rect } from '@/components/common/ContentPlaceholder';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SubscriptionSkeleton = () => {
  const { theme } = useTheme();
  return (
    <LinearGradient
      start={[1, 0]}
      end={[0, 1]}
      colors={[theme.primary600, theme.white]}
      style={styles.container}>
      <View
        style={{
          ...styles.innerContainer,
          backgroundColor: theme.white,
        }}>
        <ContentPlaceholder height={200}>
          {/* Title */}
          <Rect x="20" y="20" rx="4" ry="4" width="120" height="25" />
          {/* Validity */}
          <Rect x="20" y="55" rx="4" ry="4" width="180" height="15" />

          {/* Price */}
          <Rect x="280" y="20" rx="4" ry="4" width="80" height="30" />

          <Rect x="20" y="90" rx="3" ry="3" width="250" height="12" />
          <Rect x="20" y="110" rx="3" ry="3" width="200" height="12" />
          <Rect x="20" y="130" rx="3" ry="3" width="220" height="12" />

          <Rect x="20" y="150" rx="8" ry="8" width="340" height="44" />
        </ContentPlaceholder>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(1),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
  },
  innerContainer: {
    borderRadius: moderateScale(11),
  },
});

export default SubscriptionSkeleton;
