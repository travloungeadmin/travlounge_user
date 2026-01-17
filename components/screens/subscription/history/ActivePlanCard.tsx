import { ThemedText } from '@/components/common/ThemedText';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SubscriptionPlan } from '@/types/api/subscription.types';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ActivePlanCardProps {
  item: SubscriptionPlan;
}

const ActivePlanCard = ({ item }: ActivePlanCardProps) => {
  return (
    <LinearGradient
      key={item.subscription_id}
      colors={item.pricing.offer_price === 0 ? ['#E8F0FE', '#E8F0FE'] : ['#E8F0FE', '#FFFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.planCard}>
      <View style={styles.planHeader}>
        <View>
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
            <ThemedText variant="body" color="gray900">
              {feature}
            </ThemedText>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  planCard: {
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    borderWidth: 1,
    borderColor: '#E1E9EE',
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
