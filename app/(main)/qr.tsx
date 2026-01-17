import { ThemedText } from '@/components/common/ThemedText';
import ActiveSubscription from '@/components/screens/qr/ActiveSubscription';
import AddPointsBanner from '@/components/screens/qr/AddPointsBanner';
import EliteCard from '@/components/screens/qr/EliteCard';
import QRDisplay from '@/components/screens/qr/QRDisplay';
import QRSkeleton from '@/components/screens/qr/QRSkeleton';
import SubscriptionOffer from '@/components/screens/qr/SubscriptionOffer';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { getWalletDetails } from '@/services/query/qr';
import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const QRScreen = () => {
  const { data, refetch, isLoading } = getWalletDetails();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const activeSubscriptions = data?.data?.active_subscription;
  const subscriptions = data?.data?.subscriptions;

  if (isLoading) {
    return <QRSkeleton />;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <QRDisplay username={data?.data?.user?.username} userId={data?.data?.user?.user_id} />

          <ThemedText style={styles.sectionHeader} variant="titleEmphasized">
            Your points & subscription
          </ThemedText>

          {data?.data?.elite_card?.total_points ? (
            <EliteCard data={data?.data?.elite_card} />
          ) : (
            <AddPointsBanner />
          )}
          {activeSubscriptions && activeSubscriptions.length > 0 ? (
            <ActiveSubscription activeSubscriptions={activeSubscriptions} />
          ) : (
            <SubscriptionOffer subscriptions={subscriptions} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: moderateScale(20),
  },
  contentContainer: {
    flex: 1,
    gap: moderateScale(16),
  },
  sectionHeader: {
    paddingLeft: SPACING.screenPadding,
  },
});

export default QRScreen;
