import { ThemedText } from '@/components/common/ThemedText';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type EliteCardData = {
  total_points: number | null;
  worth_amount?: number;
};

type EliteCardProps = {
  data?: EliteCardData;
};

const EliteCard = ({ data }: EliteCardProps) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={() => {
        router.push('/elite-card/wallet');
      }}>
      <LinearGradient
        start={[0, 0]}
        end={[1, 1]}
        colors={[theme.primary600, theme.primary200, theme.primary200, theme.primary600]}
        style={styles.outerGradient}>
        <LinearGradient
          start={[0, 0]}
          end={[1, 1]}
          colors={[theme.primary100, theme.white, theme.white, theme.primary100]}
          style={styles.innerGradient}>
          <View style={styles.cardContentLeft}>
            <Image
              source={require('@/assets/images/elite-card/elite-coin.png')}
              style={styles.coinIcon}
            />
            <View>
              <ThemedText variant="bodyEmphasized" color="gray900">
                Travlounge
              </ThemedText>
              <ThemedText variant="titleEmphasized" color="gray900">
                Elite card
              </ThemedText>
            </View>
          </View>
          <View style={styles.cardContentRight}>
            <ThemedText variant="boldHighlightTextS" color="gray900">
              {data?.total_points?.toLocaleString() ?? 0}{' '}
              <ThemedText variant="titleEmphasized" color="gray900">
                Pts
              </ThemedText>
            </ThemedText>
            <ThemedText variant="bodySmallEmphasized" color="gray900">
              Worth approx ₹{data?.worth_amount?.toLocaleString() ?? 0}
            </ThemedText>
          </View>
        </LinearGradient>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outerGradient: {
    padding: moderateScale(1),
    width: SPACING.contentWidth,
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    flexDirection: 'row',
  },
  innerGradient: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    padding: moderateScale(16),
    flexDirection: 'row',
    width: '100%',
  },
  cardContentLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  coinIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
  },
  cardContentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  emptyPointsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  loadPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  textRight: {
    textAlign: 'right',
  },
  plusIconContainer: {
    height: moderateScale(36),
    width: moderateScale(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(18),
  },
});

export default EliteCard;
