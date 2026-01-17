import { ContentPlaceholder, Rect } from '@/components/common/ContentPlaceholder';
import { ThemedView } from '@/components/common/ThemedView';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const QRSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Username Placeholder */}
        <ContentPlaceholder width="100%" height={30}>
          <Rect x={(SPACING.deviceWidth - 150) / 2} y="0" rx="4" ry="4" width="150" height="24" />
        </ContentPlaceholder>

        {/* QR Code Placeholder */}
        <View style={styles.qrWrapper}>
          <ThemedView backgroundColor="white" style={styles.qrBackground}>
            <ContentPlaceholder
              width={SPACING.deviceWidth * 0.7 - moderateScale(40)}
              height={SPACING.deviceWidth * 0.7 - moderateScale(40)}>
              <Rect
                x="0"
                y="0"
                rx="8"
                ry="8"
                width={SPACING.deviceWidth * 0.7 - moderateScale(40)}
                height={SPACING.deviceWidth * 0.7 - moderateScale(40)}
              />
            </ContentPlaceholder>
          </ThemedView>
          <View style={styles.labelRow}>
            <ContentPlaceholder width="100%" height={20}>
              <Rect x="0" y="0" rx="4" ry="4" width="100" height="20" />
              <Rect x={SPACING.deviceWidth * 0.7 - 50} y="0" rx="4" ry="4" width="50" height="20" />
            </ContentPlaceholder>
          </View>
        </View>

        {/* Elite Card Placeholder */}
        <View style={styles.eliteCardPlaceholder}>
          <ContentPlaceholder width={SPACING.contentWidth} height={moderateScale(100)}>
            <Rect
              x="0"
              y="0"
              rx="8"
              ry="8"
              width={SPACING.contentWidth}
              height={moderateScale(100)}
            />
          </ContentPlaceholder>
        </View>

        {/* Subscription Section Placeholder */}
        <View style={styles.subscriptionPlaceholder}>
          <ContentPlaceholder width="100%" height={40}>
            <Rect x="0" y="0" rx="4" ry="4" width="200" height="24" />
          </ContentPlaceholder>
          <View style={styles.subscriptionCardPlaceholder}>
            <ContentPlaceholder width={SPACING.deviceWidth * 0.85} height={150}>
              <Rect x="0" y="0" rx="8" ry="8" width={SPACING.deviceWidth * 0.85} height={150} />
            </ContentPlaceholder>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    gap: moderateScale(16),
  },
  qrWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    width: SPACING.deviceWidth * 0.7,
    justifyContent: 'center',
    gap: moderateScale(20),
  },
  qrBackground: {
    backgroundColor: '#fff',
    padding: SPACING.screenPadding,
    borderRadius: SPACING.screenPadding,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  eliteCardPlaceholder: {
    alignSelf: 'center',
    width: SPACING.contentWidth,
    height: moderateScale(100),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  subscriptionPlaceholder: {
    marginTop: moderateScale(20),
    paddingHorizontal: SPACING.screenPadding,
  },
  subscriptionCardPlaceholder: {
    marginTop: moderateScale(10),
  },
});

export default QRSkeleton;
