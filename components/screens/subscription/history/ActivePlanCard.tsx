import { ThemedText } from '@/components/common/ThemedText';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SubscriptionPlan } from '@/types/api/subscription.types';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ActivePlanCardProps {
  item: SubscriptionPlan;
}

const ActivePlanCard = ({ item }: ActivePlanCardProps) => {
  const { theme } = useTheme();
  return (
    <LinearGradient
      key={item.subscription_id}
      colors={[theme.primary600, theme.primary50]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ padding: moderateScale(1), borderRadius: moderateScale(12) }}>
      <LinearGradient
        key={item.subscription_id}
        colors={[theme.primary200, theme.primary50, theme.primary200]}
        start={{ x: -0.5, y: -0.5 }}
        end={{ x: 1.5, y: 1.5 }}
        style={styles.planCard}>
        <View style={[styles.planHeader]}>
          <View style={{ flex: 1 }}>
            <ThemedText variant="title" color="gray900">
              {item.plan_name}
            </ThemedText>
            <ThemedText variant="bodySmall" color="gray600" style={styles.validityText}>
              {item.validity.value} {item.validity.unit} {item.total_uses} Uses
            </ThemedText>
          </View>
          <ThemedText variant="titleEmphasized" color="gray900">
            ₹{item.pricing.offer_price}
            <ThemedText variant="bodySmall" color="gray600">
              +GST
            </ThemedText>
          </ThemedText>
        </View>

        <View style={styles.featuresContainer}>
          {item.offer.map((feature: string, index: number) => (
            <View key={index} style={styles.featureRow}>
              <View style={styles.bulletPoint} />
              <ThemedText variant="labelLarge" color="gray900">
                {feature}
              </ThemedText>
            </View>
          ))}
        </View>
      </LinearGradient>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  planCard: {
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: moderateScale(12),
  },
  validityText: {
    marginTop: 4,
  },
  featuresContainer: {
    gap: moderateScale(8),
    marginBottom: moderateScale(12),
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  bulletPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'black',
  },
});

export default ActivePlanCard;
