import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import Icon from '@/components/ui/icon';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { Benefit, Subscription } from '@/services/api/types/qr';
import { getRemainingTime } from '@/utils/qr';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type ActiveSubscriptionProps = {
  activeSubscriptions?: Subscription[];
};

const ActiveSubscription = ({ activeSubscriptions }: ActiveSubscriptionProps) => {
  const { theme } = useTheme();

  if (!activeSubscriptions || activeSubscriptions.length === 0) {
    return null;
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        router.push('/subscription/history');
      }}>
      <ThemedView backgroundColor="white" style={styles.contentContainer}>
        {activeSubscriptions.map((subscription: Subscription, index: number) => {
          const benefits = subscription.benefits || [];
          const totalRemainingUses = benefits.reduce(
            (acc: number, curr: Benefit) => acc + (curr.remaining ?? 0),
            0
          );

          return (
            <ThemedView
              key={subscription.subscription_id || index}
              style={styles.subscriptionCard}
              backgroundColor="primary50">
              <View style={styles.statsInner}>
                <View style={styles.activePlaneRow}>
                  <ThemedView backgroundColor="primary800" style={styles.circle}>
                    <Icon name="TravloungeIcon" size={moderateScale(30)} />
                  </ThemedView>
                  <View style={styles.flexOne}>
                    <ThemedText variant="bodyEmphasized" color="gray900">
                      {subscription.plan_name}
                    </ThemedText>
                    <View style={styles.balanceRow}>
                      <ThemedText
                        style={[styles.separatorText, { borderRightColor: theme.gray300 }]}
                        variant="titleEmphasized"
                        color="gray900">
                        {getRemainingTime(subscription.valid_till).value}{' '}
                        {getRemainingTime(subscription.valid_till).unit}
                      </ThemedText>
                      <ThemedText variant="titleEmphasized" color="gray900">
                        {totalRemainingUses} Uses
                      </ThemedText>
                    </View>
                  </View>
                </View>

                <ThemedView backgroundColor="primary200" style={styles.divider} />
                <View style={styles.listContainer}>
                  {benefits.map((item: Benefit, idx: number) => (
                    <View key={idx} style={styles.listItem}>
                      <ThemedView backgroundColor="gray200" style={styles.dot} />
                      <ThemedText variant="body" color="gray600">
                        {item.category}:{item.remaining}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            </ThemedView>
          );
        })}
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.screenPadding,
  },
  contentContainer: {
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    gap: moderateScale(16),
  },
  subscriptionCard: {
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    overflow: 'hidden',
    width: SPACING.deviceWidth * 0.85,
  },
  statsInner: {
    zIndex: 1,
    flex: 1,
  },
  activePlaneRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(32),
  },
  flexOne: {
    flex: 1,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  separatorText: {
    borderRightWidth: moderateScale(2),
    paddingRight: moderateScale(8),
  },
  divider: {
    height: moderateScale(1),
    marginVertical: moderateScale(12),
  },
  listContainer: {
    flexDirection: 'row',
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  dot: {
    height: moderateScale(4),
    width: moderateScale(4),
    borderRadius: moderateScale(4),
    marginLeft: moderateScale(8),
  },
});

export default ActiveSubscription;
