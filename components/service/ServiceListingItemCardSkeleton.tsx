import { SPACING } from '@/newConstants/spacing';
import { useTheme } from '@/newTheme';
import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View } from 'react-native';

const ServiceListingItemCardSkeleton = () => {
  const { theme } = useTheme();

  // paddingHorizontal: 16 is applied in the FlatList container in common-listings.tsx
  const cardWidth = SPACING.screenWidth - 32;
  const imageHeight = SPACING.screenWidth * 0.58;
  const contentHeight = 80;
  const totalHeight = imageHeight + contentHeight;

  return (
    <View style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: theme.white }}>
      <ContentLoader
        speed={1}
        width={cardWidth}
        height={totalHeight}
        viewBox={`0 0 ${cardWidth} ${totalHeight}`}
        backgroundColor={theme.gray200}
        foregroundColor={theme.gray100}>
        {/* Image */}
        <Rect x="0" y="0" rx="0" ry="0" width={cardWidth} height={imageHeight} />

        {/* Title */}
        <Rect x="10" y={imageHeight + 15} rx="4" ry="4" width={cardWidth * 0.6} height="20" />

        {/* Distance (Right aligned) */}
        <Rect x={cardWidth - 60} y={imageHeight + 15} rx="4" ry="4" width="50" height="20" />

        {/* Place */}
        <Rect x="10" y={imageHeight + 45} rx="4" ry="4" width={cardWidth * 0.4} height="16" />

        {/* Rating (Right aligned) */}
        <Rect x={cardWidth - 40} y={imageHeight + 45} rx="4" ry="4" width="30" height="16" />
      </ContentLoader>
    </View>
  );
};

export default ServiceListingItemCardSkeleton;
