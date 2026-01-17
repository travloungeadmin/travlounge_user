import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { showError, showSuccess } from '@/lib/toast';
import useUserStore from '@/modules/user';
import { SPACING } from '@/newConstants/spacing';
import { Subscription } from '@/services/api/subscription';
import queryClient from '@/services/query';
import { subscribeMutation, verifySubscribeMutation } from '@/services/query/profile';
import QUERIES_KEY from '@/services/query/query-keys';
import { handleRazorpay } from '@/utils/subscription';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

const SubscriptionCard = ({ subscription }: { subscription: Subscription }) => {
  const { theme } = useTheme();
  const { user } = useUserStore();
  const { mutate, isPending } = subscribeMutation();
  const { mutate: verifyMutation } = verifySubscribeMutation();

  const handleBuy = (id: number) => {
    const data = new FormData();
    data.append('package', id.toString());

    mutate(data, {
      onSuccess: (data: any) => {
        if (!data?.is_profile_completed) {
          Alert.alert(
            'Profile Incomplete',
            'Please complete your profile before proceeding to payment.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Go to Profile',
                onPress: () => {
                  router.navigate({
                    pathname: '/(main)/old/edit-profile',
                    params: { type: 'edit' },
                  });
                },
              },
            ]
          );
        } else if (data?.order_id?.includes('TRV')) {
          showSuccess('Success', 'Welcome bonus applied successfully');
          queryClient.invalidateQueries({
            queryKey: [QUERIES_KEY.PACKAGES_LIST],
          });
          router.back();
          return;
        } else {
          handleRazorpay({
            id: data?.order_id,
            subscription_id: data?.subscription_id,
            amount: data?.total_amount,
            user,
            verifyMutation,
          });
        }
      },
      onError: (err: any) => {
        if (err?.response?.data?.detail) {
          showError('Error', err?.response?.data?.detail);
          return;
        }
        showError(
          'Error',
          err?.response?.data?.message || 'Something went wrong, please try again later'
        );
      },
    });
  };
  return (
    <LinearGradient
      style={styles.cardContainer}
      start={[1, 0]}
      end={[0, 1]}
      colors={[theme.primary600, theme.white]}>
      <LinearGradient
        style={styles.innerGradient}
        start={[-1, -0.5]}
        end={[1, 1]}
        colors={[theme.primary600, theme.white]}>
        <View style={styles.header}>
          <View>
            <ThemedText variant="titleLargeEmphasized" color="gray900">
              {subscription.plan_name}
            </ThemedText>
            <ThemedText variant="labelLarge" color="gray900">
              {subscription.validity.value} {subscription.validity.unit} validity{'    '}
              {subscription.total_uses} Uses
            </ThemedText>
          </View>
          <View style={styles.priceContainer}>
            <ThemedText variant="boldHighlightText" color="gray900">
              {subscription.pricing.offer_price}
            </ThemedText>
            {subscription.pricing.gst.applicable && (
              <ThemedText variant="boldHighlightTextSx" color="gray900">
                +GST
              </ThemedText>
            )}
          </View>
        </View>
        <View style={styles.offersContainer}>
          {subscription.offer.map((offer, index) => (
            <View key={index} style={styles.offerItem}>
              <ThemedView style={styles.dot} backgroundColor="gray900" />
              <ThemedText variant="labelLarge" color="gray900">
                {offer}
              </ThemedText>
            </View>
          ))}
        </View>
        {subscription.note && (
          <ThemedText variant="bodySmallEmphasized" color="gray900">
            *{subscription.note}
          </ThemedText>
        )}
        <Pressable onPress={() => handleBuy(subscription.subscription_id)} disabled={isPending}>
          <ThemedView style={styles.subscribeButton} backgroundColor="primary600">
            <ThemedText variant="titleSmallEmphasized" color="white">
              {isPending ? 'Processing...' : 'Subscribe'}
            </ThemedText>
          </ThemedView>
        </Pressable>
      </LinearGradient>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: moderateScale(1),
    borderRadius: moderateScale(12),
  },
  innerGradient: {
    borderRadius: moderateScale(11),
    padding: moderateScale(16),
    gap: SPACING.screenPadding,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  offersContainer: {
    gap: moderateScale(8),
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  dot: {
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    width: moderateScale(6),
  },
  subscribeButton: {
    height: moderateScale(44),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SubscriptionCard;
