import ScreenWrapper from '@/components/common/ScreenWrapper';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { useTheme } from '@/newTheme';
import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View } from 'react-native';

const HomeScreenSkeleton = () => {
  const { theme } = useTheme();

  // Dimensions
  const screenPadding = SPACING.screenPadding;
  const contentWidth = SPACING.contentWidth; // Device width - 36 (screenPadding * 2 if likely 18?) or 32
  // SPACING.screenPadding is moderateScale(16) -> 16
  // SPACING.contentWidth is DEVICE_WIDTH - moderateScale(32) -> Correct.

  const bannerHeight = SPACING.screenWidth * 0.51;

  const cardGap = moderateScale(12);
  const cardSize = (contentWidth - cardGap) / 2;

  const serviceGap = moderateScale(12);
  const serviceItemWidth = (contentWidth - serviceGap * 2) / 3;
  const serviceItemHeight = moderateScale(140);

  const associationWidth = SPACING.deviceWidth * 0.78;
  const associationHeight = associationWidth * 0.5;

  // Calculate Y positions for readability and stacking
  let currentY = moderateScale(16); // Padding top for banner container

  const bannerY = currentY;
  currentY += bannerHeight + moderateScale(20); // + spacing

  const cardsY = currentY;
  currentY += cardSize + moderateScale(20); // + spacing

  const serviceTitleY = currentY;
  currentY += 24 + moderateScale(12); // title height + spacing

  const serviceGridY = currentY;
  currentY += serviceItemHeight + moderateScale(12); // 1st row + spacing
  // 2nd row (optional, let's show 2 rows to fill space)
  const serviceGridRow2Y = currentY;
  currentY += serviceItemHeight + moderateScale(30); // 2nd row + spacing

  const associationTitleY = currentY;
  currentY += 24 + moderateScale(12);

  const associationListY = currentY;
  currentY += associationHeight + moderateScale(30);

  const totalHeight = currentY;

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, backgroundColor: theme.backgroundPrimary }}>
        <ContentLoader
          speed={1}
          width={SPACING.screenWidth}
          height={totalHeight}
          viewBox={`0 0 ${SPACING.screenWidth} ${totalHeight}`}
          backgroundColor={theme.gray200}
          foregroundColor={theme.gray100}>
          {/* Banner */}
          <Rect
            x={screenPadding}
            y={bannerY}
            rx={moderateScale(10)}
            ry={moderateScale(10)}
            width={contentWidth}
            height={bannerHeight}
          />

          {/* Status Cards */}
          <Rect
            x={screenPadding}
            y={cardsY}
            rx={moderateScale(8)}
            ry={moderateScale(8)}
            width={cardSize}
            height={cardSize}
          />
          <Rect
            x={screenPadding + cardSize + cardGap}
            y={cardsY}
            rx={moderateScale(8)}
            ry={moderateScale(8)}
            width={cardSize}
            height={cardSize}
          />

          {/* Service Title */}
          <Rect
            x={screenPadding}
            y={serviceTitleY}
            rx={4}
            ry={4}
            width={moderateScale(150)}
            height={moderateScale(20)}
          />

          {/* Service Grid - Row 1 */}
          {[0, 1, 2].map((i) => (
            <Rect
              key={`s1-${i}`}
              x={screenPadding + (serviceItemWidth + serviceGap) * i}
              y={serviceGridY}
              rx={moderateScale(10)}
              ry={moderateScale(10)}
              width={serviceItemWidth}
              height={serviceItemHeight}
            />
          ))}

          {/* Service Grid - Row 2 */}
          {[0, 1, 2].map((i) => (
            <Rect
              key={`s2-${i}`}
              x={screenPadding + (serviceItemWidth + serviceGap) * i}
              y={serviceGridRow2Y}
              rx={moderateScale(10)}
              ry={moderateScale(10)}
              width={serviceItemWidth}
              height={serviceItemHeight}
            />
          ))}

          {/* Association Title */}
          <Rect
            x={screenPadding}
            y={associationTitleY}
            rx={4}
            ry={4}
            width={moderateScale(180)}
            height={moderateScale(20)}
          />

          {/* Association List */}
          <Rect
            x={screenPadding}
            y={associationListY}
            rx={moderateScale(10)}
            ry={moderateScale(10)}
            width={associationWidth}
            height={associationHeight}
          />
          <Rect
            x={screenPadding + associationWidth + moderateScale(16)}
            y={associationListY}
            rx={moderateScale(10)}
            ry={moderateScale(10)}
            width={associationWidth} // Partially visible
            height={associationHeight}
          />
        </ContentLoader>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreenSkeleton;
