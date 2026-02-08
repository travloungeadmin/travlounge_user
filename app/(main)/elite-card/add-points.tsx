import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-toast-message';

import { ContentPlaceholder, Rect } from '@/components/common/ContentPlaceholder';
import { ThemedText } from '@/components/common/ThemedText';
import ComingSoonListing from '@/components/screens/listing/coming-soon';
import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';
import useUserStore from '@/modules/user';
import { TYPOGRAPHY } from '@/newConstants/fonts';
import { SPACING } from '@/newConstants/spacing';
import { useCreateCoinOrder, useVerifyCoinOrder } from '@/services/query/service';
import { getEliteWalletDashboardQuery } from '@/services/query/wallet';

const AddPoints = () => {
  const { theme } = useTheme();
  const { data: walletData, isLoading, refetch: refetchWallet } = getEliteWalletDashboardQuery();
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateCoinOrder();
  const { mutate: verifyOrder, isPending: isVerifyingOrder } = useVerifyCoinOrder();
  const { user } = useUserStore();

  const [amount, setAmount] = useState({
    amount: 0,
    points: 0,
    id: 0,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successAmount, setSuccessAmount] = useState(0);

  const displayPoints =
    amount?.id !== 0 && amount?.points
      ? amount.points
      : amount?.amount
        ? Math.floor(amount.amount * 1)
        : 0;

  const handleBuyCoin = () => {
    if (!amount?.amount || amount.amount <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Amount',
        text2: 'Please enter a valid amount to convert',
      });
      return;
    }

    const coinsAmount = amount.amount;

    createOrder(
      { coins_amount: coinsAmount, offer_id: amount.id },
      {
        onSuccess: (data) => {
          const options = {
            currency: 'INR',
            key: process.env.EXPO_PUBLIC_RAZOR_PAY_KEY_ID,
            amount: data.amount_to_pay * 100,
            name: 'Travlounge',
            order_id: data.razorpay_order_id,
            prefill: {
              contact: user?.mobile_number,
              name: user?.name,
              email: user?.email,
            },
            notes: {
              assignment_id: data.assignment_id,
            },
            theme: { color: theme.primary },
          };

          RazorpayCheckout.open(options)
            .then((res) => {
              verifyOrder(
                {
                  razorpay_order_id: res.razorpay_order_id,
                  razorpay_payment_id: res.razorpay_payment_id,
                  razorpay_signature: res.razorpay_signature,
                },
                {
                  onSuccess: () => {
                    setSuccessAmount(data.coins_amount);
                    setShowSuccessModal(true);
                    setAmount({ amount: 0, points: 0, id: 0 });
                    refetchWallet();
                  },
                  onError: (error) => {
                    Toast.show({
                      type: 'error',
                      text1: 'Verification Failed',
                      text2: 'Payment verification failed. Please contact support.',
                    });
                  },
                }
              );
            })
            .catch((error) => {
              Toast.show({
                type: 'error',
                text1: 'Payment Failed',
                text2: error.description || 'Payment was cancelled or failed',
              });
            });
        },
        onError: (error) => {
          console.error('Create Order Error', error);
          Toast.show({
            type: 'error',
            text1: 'Order Creation Failed',
            text2: 'Could not create order. Please try again.',
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={[styles.headerSection, { marginTop: SPACING.screenPadding }]}>
          <ContentPlaceholder width={SPACING.contentWidth} height={moderateScale(100)}>
            <Rect
              x="0"
              y="0"
              rx="16"
              ry="16"
              width={SPACING.contentWidth}
              height={moderateScale(100)}
            />
          </ContentPlaceholder>
        </View>

        <View style={styles.offersSection}>
          <View
            style={{ paddingHorizontal: SPACING.screenPadding, marginBottom: moderateScale(12) }}>
            <ContentPlaceholder width={150} height={20}>
              <Rect x="0" y="0" rx="4" ry="4" width="150" height="20" />
            </ContentPlaceholder>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: SPACING.screenPadding,
              gap: moderateScale(12),
            }}>
            {[1, 2].map((i) => (
              <ContentPlaceholder key={i} width={160} height={moderateScale(70)}>
                <Rect x="0" y="0" rx="13" ry="13" width="160" height={moderateScale(70)} />
              </ContentPlaceholder>
            ))}
          </View>
        </View>

        <View style={[styles.inputSection, { marginTop: 'auto' }]}>
          <View style={{ marginBottom: moderateScale(16) }}>
            <ContentPlaceholder width={150} height={20}>
              <Rect x="0" y="0" rx="4" ry="4" width="100" height="20" />
            </ContentPlaceholder>
            <View style={{ marginTop: moderateScale(8) }}>
              <ContentPlaceholder width="100%" height={moderateScale(80)}>
                <Rect x="0" y="0" rx="12" ry="12" width="100%" height={moderateScale(80)} />
              </ContentPlaceholder>
            </View>
          </View>
          <ContentPlaceholder width="100%" height={moderateScale(44)}>
            <Rect x="0" y="0" rx="8" ry="8" width="100%" height={moderateScale(44)} />
          </ContentPlaceholder>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <View style={styles.headerSection}>
              <ImageBackground
                source={require('@/assets/images/elite-card/add-coin-bg.png')}
                style={styles.balanceCard}>
                <View>
                  <Image
                    source={require('@/assets/images/elite-card/elite-coin.png')}
                    style={styles.coinIcon}
                  />
                  <ThemedText variant="bodyLargeEmphasized" color="white">
                    Balance
                  </ThemedText>
                </View>
                <View style={styles.balanceInfo}>
                  <ThemedText variant="large" color="white">
                    {walletData?.coin_balance} Pts
                  </ThemedText>
                  <ThemedText variant="body" color="white">
                    Worth approx ₹{walletData?.coin_balance}
                  </ThemedText>
                </View>
              </ImageBackground>
              <ThemedView backgroundColor="white" style={styles.emptyStateCard}>
                <Image
                  source={
                    (walletData?.coin_balance || 0) > 0
                      ? require('@/assets/images/elite-card/coin-box-half.png')
                      : require('@/assets/images/elite-card/coin-box-empty.png')
                  }
                  style={styles.emptyStateImage}
                />
                <ThemedText
                  style={styles.emptyStateText}
                  variant="labelLargeEmphasized"
                  color="gray900">
                  {(walletData?.coin_balance || 0) > 0
                    ? 'Your new coin box with coins is ready to credit'
                    : 'Your new coin box is empty. Enter an amount to fill the box.'}
                </ThemedText>
              </ThemedView>
            </View>

            {walletData?.offers && (
              <View style={styles.offersSection}>
                <ThemedText variant="bodyLargeEmphasized" style={styles.sectionTitle}>
                  The best offer for you
                </ThemedText>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.offersScroll}>
                  {walletData?.offers?.map((offer, index) => (
                    <TouchableOpacity
                      key={offer.id || index}
                      onPress={() =>
                        setAmount({
                          amount: offer.amount_inr,
                          points: offer.coins_given,
                          id: offer.id,
                        })
                      }
                      style={{ height: '100%', marginRight: moderateScale(12) }}>
                      <OfferCard
                        title={offer.offer_name}
                        points={offer.coins_given?.toString()}
                        price={`₹${offer.amount_inr}`}
                        bonus={offer.bonus_coins}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <View style={styles.inputSection}>
            <View style={styles.inputContainer}>
              <ThemedText variant="bodySmall" color="gray600" style={styles.inputLabel}>
                How much to convert?
              </ThemedText>
              <View style={styles.inputRow}>
                <ThemedText variant="titleLarge" color="gray900" style={styles.currencySymbol}>
                  ₹
                </ThemedText>
                <TextInput
                  style={[styles.input, { color: theme.gray900 }]}
                  placeholder="Enter Amount"
                  placeholderTextColor={theme.gray400}
                  keyboardType="numeric"
                  value={amount.amount > 0 ? amount.amount.toString() : ''}
                  onChangeText={(text) => {
                    const val = parseInt(text) || 0;
                    setAmount({
                      amount: val,
                      points: val, // Default 1:1 conversion for custom input
                      id: 0,
                    });
                  }}
                />
                {displayPoints > 0 && (
                  <ThemedText
                    variant="headlineEmphasized"
                    color="gray900"
                    style={styles.pointsPreview}>
                    {displayPoints}Pts
                  </ThemedText>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.buyButton, { backgroundColor: theme.primary }]}
              onPress={handleBuyCoin}
              disabled={isCreatingOrder || isVerifyingOrder}>
              <View style={styles.buyButtonContent}>
                {isCreatingOrder || isVerifyingOrder ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <>
                    <Ionicons name="wallet-outline" size={20} color="white" />
                    <ThemedText color="white" variant="bodyLargeEmphasized">
                      Buy Coin
                    </ThemedText>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <CoinSuccessModal
            visible={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            amount={successAmount}
          />
        </View> */}
        <ComingSoonListing image={require('@/assets/images/coming_soon_make_a_trip.png')} />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

interface OfferCardProps {
  title: string;
  points: string;
  price: string;
  bonus?: number;
}

const OfferCard = ({ title, points, price, bonus }: OfferCardProps) => {
  const { theme } = useTheme();
  return (
    <LinearGradient
      style={{
        height: moderateScale(70),
        padding: moderateScale(1),
        borderRadius: moderateScale(13),
      }}
      colors={theme.goldStroke}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <LinearGradient
        colors={theme.goldStroke}
        style={styles.offerCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Image
          source={require('@/assets/images/elite-card/coin-bundle-icon.png')}
          style={{
            height: moderateScale(58),
            width: moderateScale(58),
          }}
        />
        <View>
          <ThemedText variant="labelSmall" color="secondary950">
            {title}
          </ThemedText>
          <View style={styles.offerPriceRow}>
            <ThemedText variant="labelLargeEmphasized" color="gray900">
              {points}Pts
            </ThemedText>
            <ThemedText variant="bodySmall" color="gray900">
              {' '}
              - {price}
            </ThemedText>
          </View>
          {bonus && bonus > 0 && (
            <ThemedText variant="labelSmall" color="secondary950" style={{ fontSize: 10 }}>
              +{bonus} Bonus
            </ThemedText>
          )}
        </View>
      </LinearGradient>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.screenPadding,
    flex: 1,
  },
  scrollContent: {
    paddingTop: SPACING.screenPadding,
    paddingBottom: SPACING.screenBottom,
  },
  headerSection: {
    flex: 1,
    gap: moderateScale(12),
    paddingHorizontal: SPACING.screenPadding,
  },
  balanceCard: {
    width: SPACING.contentWidth,
    height: moderateScale(100),
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    padding: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  balanceInfo: {
    alignItems: 'flex-end',
  },
  emptyStateCard: {
    flex: 1,
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    gap: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(12),
  },
  emptyStateImage: {
    width: SPACING.contentWidth - moderateScale(36),
    height: (SPACING.contentWidth - moderateScale(36)) * 0.66,
  },
  emptyStateText: {
    width: SPACING.deviceWidth * 0.6,
    textAlign: 'center',
  },
  offersSection: {
    marginTop: moderateScale(24),
  },
  sectionTitle: {
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: moderateScale(12),
  },
  offersScroll: {
    paddingHorizontal: SPACING.screenPadding,
    overflow: 'visible',
  },
  offerCard: {
    paddingHorizontal: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
    borderRadius: moderateScale(12),
    height: '100%',
  },
  offerIconPlaceholder: {
    //
  },
  offerPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputSection: {
    paddingBottom: SPACING.screenBottom,
    backgroundColor: 'white',
    borderRadius: moderateScale(16),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: moderateScale(16),
    gap: moderateScale(16),
    marginTop: moderateScale(24),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    height: moderateScale(80),
    justifyContent: 'center',
  },
  inputLabel: {
    marginBottom: moderateScale(4),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencySymbol: {
    marginRight: moderateScale(4),
  },
  input: {
    flex: 1,
    ...(TYPOGRAPHY.titleLarge as any),
  },
  pointsPreview: {},
  buyButton: {
    height: moderateScale(44),
    justifyContent: 'center',
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  buyButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
});

export default AddPoints;
