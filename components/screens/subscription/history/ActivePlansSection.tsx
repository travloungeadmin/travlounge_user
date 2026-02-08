import { ContentPlaceholder, Rect } from '@/components/common/ContentPlaceholder';
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { SubscriptionPlan, SubscriptionResponse } from '@/types/api/subscription.types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ActivePlanCard from './ActivePlanCard';

interface ActivePlansSectionProps {
  isLoading: boolean;
  activeSubscriptions?: SubscriptionResponse;
}

const ActivePlansSection = ({ isLoading, activeSubscriptions }: ActivePlansSectionProps) => {
  return (
    <ThemedView backgroundColor="white" style={styles.container}>
      <View style={styles.sectionContainer}>
        <ThemedText variant="titleSmallEmphasized" color="gray900" style={styles.sectionTitle}>
          Active plan
        </ThemedText>
        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ContentPlaceholder height={180}>
              <Rect x="0" y="0" rx="12" ry="12" width="100%" height="180" />
            </ContentPlaceholder>
          ) : (
            activeSubscriptions?.subscriptions?.map((item: SubscriptionPlan) => (
              <ActivePlanCard key={item.subscription_id} item={item} />
            ))
          )}
        </View>

        <Pressable onPress={() => router.navigate('/subscription/[id]')} style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <ThemedText variant="titleSmallEmphasized" color="white">
            Add other plans
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.screenPadding,
    marginVertical: SPACING.screenPadding,
    borderRadius: moderateScale(12),
  },
  sectionContainer: {
    padding: SPACING.screenPadding,
    gap: moderateScale(16),
  },
  sectionTitle: {
    marginBottom: moderateScale(4),
  },
  cardsContainer: {
    gap: moderateScale(16),
  },
  addButton: {
    backgroundColor: '#1E40AF',
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(12),
    gap: moderateScale(8),
    marginTop: moderateScale(8),
  },
});

export default ActivePlansSection;
