import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { Benefit, Subscription } from '@/services/api/types/qr';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type SubscriptionOfferProps = {
  subscriptions?: Subscription[];
};

const SubscriptionOffer = ({ subscriptions }: SubscriptionOfferProps) => {
  const { theme } = useTheme();

  const getTotalUses = (benefits: Benefit[]): number => {
    return benefits.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <Pressable
      onPress={() => {
        router.push('/subscription/[id]');
      }}>
      <LinearGradient
        start={[0, 0]}
        end={[1, 1]}
        colors={[theme.primary600, theme.primary200, theme.primary200, theme.primary600]}
        style={styles.cardBackground}>
        <LinearGradient
          start={[0, 0]}
          end={[1, 1]}
          colors={[theme.primary100, theme.white, theme.white, theme.primary100]}
          style={styles.innerGradient}>
          <View style={styles.contentWrapper}>
            <View style={styles.headerRow}>
              <View>
                <ThemedText variant="labelLargeEmphasized" color="gray900">
                  You don't have subscription
                </ThemedText>
                <ThemedText variant="body" color="gray900">
                  Here the plan offer for you.
                </ThemedText>
              </View>
              <ThemedView style={styles.getPlanButton} backgroundColor="secondary">
                <ThemedText variant="labelLargeEmphasized" color="primary">
                  Get Plan
                </ThemedText>
                <Feather name="plus-circle" size={moderateScale(20)} color={theme.primary} />
              </ThemedView>
            </View>
            {subscriptions?.map((item: Subscription, idx: number) => (
              <ThemedView key={idx} style={styles.planCard} backgroundColor="primary100">
                <View>
                  <ThemedText variant="titleEmphasized" color="gray900">
                    {item.plan_name}
                  </ThemedText>
                  <ThemedText variant="body" color="gray900">
                    {item.duration_months} Month validity {getTotalUses(item.benefits)} Uses
                  </ThemedText>
                </View>
                <ThemedText variant="boldHighlightText" color="gray900">
                  299
                  <ThemedText variant="bodySmallEmphasized" color="gray900">
                    +GST
                  </ThemedText>
                </ThemedText>
              </ThemedView>
            ))}
          </View>
        </LinearGradient>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardBackground: {
    alignSelf: 'center',
    padding: moderateScale(1),
    width: SPACING.contentWidth,
    borderRadius: moderateScale(16),
    overflow: 'hidden',
  },
  innerGradient: {
    width: '100%',
    flexDirection: 'column',
    borderRadius: moderateScale(16),
  },
  contentWrapper: {
    gap: moderateScale(12),
    padding: moderateScale(16),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  getPlanButton: {
    height: moderateScale(36),
    paddingHorizontal: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(36),
    flexDirection: 'row',
    gap: moderateScale(4),
  },
  planCard: {
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SubscriptionOffer;
