import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import Icon from '@/components/ui/icon';
import { usePaymentTimer } from '@/hooks/usePaymentTimer';
import useUserStore from '@/modules/user';
import { SPACING } from '@/newConstants/spacing';
import { useTheme } from '@/newTheme';
import { useVerifyPaymentRequest } from '@/services/query/service';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-toast-message';

export interface PaymentRequestResponse {
  order_id: string;
  request_id: string;
  razorpay_order_id: string;
  user: {
    id: string;
    name: string;
    profile_image: string;
  };
  merchant: {
    id: string;
    name: string;
    location: string;
    image: string;
  };
  backend_order_id: string;
  amount_breakdown: {
    currency: string;
    subtotal: number;
    discount: {
      type: string;
      coins_used: number;
      discount_amount: number;
    };
    total_payable: number;
  };
  reward: {
    points_to_credit: number;
    card_type: string;
  };
  schedule: {
    requested_at: string;
  };
  status: string;
}

const PaymentRequestScreen = () => {
  const { theme } = useTheme();
  const { data } = useLocalSearchParams<{ data: string }>();
  const { user } = useUserStore();
  const { mutate: verifyOrder, isPending: isVerifyingOrder } = useVerifyPaymentRequest();

  const paymentData: PaymentRequestResponse = data ? JSON.parse(data) : null;

  const paymentRequest = paymentData;

  // Initialize timer
  const { minutes, seconds, isExpired, pause, resume, isPaused } = usePaymentTimer({
    requestedAt: paymentRequest?.schedule?.requested_at || new Date().toISOString(),
    requestId: paymentRequest?.request_id || '',
    onExpire: () => {
      Toast.show({
        type: 'error',
        text1: 'Payment Request Expired',
        text2: 'This payment request has expired after 5 minutes',
      });
      router.replace('/(main)/(tab)');
    },
  });

  // Format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const formattedDate = date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return { time, date: formattedDate };
  };

  const { time, date } = paymentRequest
    ? formatDateTime(paymentRequest.schedule.requested_at)
    : { time: '', date: '' };

  const handleContinueToPay = async () => {
    // Prevent payment if timer is expired
    if (isExpired) {
      Toast.show({
        type: 'error',
        text1: 'Payment Request Expired',
        text2: 'This payment request has expired. Please request a new payment link.',
      });
      router.replace('/(main)/(tab)');
      return;
    }

    // Pause the timer when payment processing starts
    await pause();

    const options = {
      currency: 'INR',
      key: process.env.EXPO_PUBLIC_RAZOR_PAY_KEY_ID,
      amount: paymentRequest.amount_breakdown.total_payable * 100,
      name: 'Travlounge',
      order_id: paymentRequest.razorpay_order_id,
      prefill: {
        contact: user?.mobile_number,
        name: user?.name,
        // email: 'suhail@gmail.com',
      },
      theme: { color: theme.primary },
    };

    RazorpayCheckout.open(options)
      .then((res) => {
        // Payment successful, verify it
        verifyOrder(
          {
            order_id: paymentRequest.backend_order_id,
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature,
          },
          {
            onSuccess: () => {
              Toast.show({
                type: 'success',
                text1: 'Payment Verified',
                text2: 'Payment verification successful',
              });
              router.replace('/(main)/(tab)');
            },
            onError: (error) => {
              // Resume timer on verification failure
              resume();
              Toast.show({
                type: 'error',
                text1: 'Verification Failed',
                text2: 'Payment verification failed. Please contact support.',
              });
            },
          }
        );
      })
      .catch(async (error) => {
        // Resume timer if payment was cancelled or failed
        await resume();
        Toast.show({
          type: 'error',
          text1: 'Payment Failed',
          text2: error.description || 'Payment was cancelled or failed',
        });
      });
  };

  const handleDismiss = () => {
    router.replace('/(main)/(tab)');
  };

  // if (!paymentRequest) {
  //   return (
  //     <ThemedView backgroundColor="backgroundTop" style={styles.container}>
  //       <View style={styles.errorContainer}>
  //         <ThemedText variant="bodyLargeEmphasized" color="gray900">
  //           No payment request data available
  //         </ThemedText>
  //       </View>
  //     </ThemedView>
  //   );
  // }

  return (
    <ThemedView backgroundColor="backgroundTop" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.greetingContainer}>
          <ThemedText variant="bodyLargeEmphasized" color="gray900">
            👋 Hi, {paymentRequest?.user?.name || 'Traveller'}
          </ThemedText>
        </View>

        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: paymentRequest?.merchant?.image || '' }}
            style={styles.profileImage}
          />
        </View>

        {/* Request Details */}
        <View style={styles.requestDetailsContainer}>
          <ThemedText variant="titleLargeEmphasized" color="gray900" style={styles.requestTitle}>
            Request from {paymentRequest?.merchant?.name || ''}
          </ThemedText>
          <ThemedText variant="bodyEmphasized" color="gray600" style={styles.requestSubtitle}>
            {paymentRequest?.merchant?.location || ''} · {time} - {date}
          </ThemedText>

          {/* Countdown Timer */}
          <View
            style={[
              styles.timerContainer,
              {
                backgroundColor: isExpired
                  ? theme.red100
                  : isPaused
                    ? theme.gray100
                    : theme.primary100,
                borderColor: isExpired ? theme.red500 : isPaused ? theme.gray500 : theme.primary500,
              },
            ]}>
            <Icon name="Clock" size={20} />
            <ThemedText
              variant="titleSmallEmphasized"
              color={isExpired ? 'red700' : isPaused ? 'gray700' : 'primary700'}>
              {isExpired
                ? 'Expired'
                : isPaused
                  ? 'Payment in Progress...'
                  : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
            </ThemedText>
          </View>
        </View>
        <View style={{ marginVertical: 20 }}>
          {/* Price Breakdown */}
          <View style={styles.priceBreakdownContainer}>
            <View style={styles.priceRow}>
              <ThemedText variant="boldHighlightTextXxs" color="gray900">
                {/* {paymentRequest?.amount_breakdown?.currency}{' '} */}
                {paymentRequest?.amount_breakdown?.subtotal.toLocaleString()}
              </ThemedText>
              <ThemedText variant="boldHighlightTextXxs" color="gray900">
                {' '}
                -{' '}
              </ThemedText>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <ThemedText variant="boldHighlightTextXxs" color="gray900">
                  {paymentRequest?.amount_breakdown?.discount?.coins_used}
                </ThemedText>
                <Image
                  source={require('@/assets/images/elite-card/elite-coin.png')}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
              </View>
              <ThemedText variant="boldHighlightTextXxs" color="gray900">
                {' '}
                ={' '}
              </ThemedText>
              <ThemedText variant="boldHighlightTextXxs" color="gray900">
                {/* {paymentRequest?.amount_breakdown?.currency}{' '} */}
                {paymentRequest?.amount_breakdown?.total_payable.toLocaleString()}
              </ThemedText>
            </View>
          </View>

          {/* Savings Badge */}
          <View style={[styles.savingsBadge, { backgroundColor: theme.green100 }]}>
            <Icon name="PercentageIcon" size={18} />

            <ThemedText variant="bodySmallEmphasized" color="green700">
              You will save{' '}
              <ThemedText variant="boldHighlightTextXxs" color="green700">
                {/* {paymentRequest?.amount_breakdown?.currency}{' '} */}
                {paymentRequest?.amount_breakdown?.discount?.discount_amount.toLocaleString()}
              </ThemedText>{' '}
              on this payment
            </ThemedText>
          </View>
        </View>

        {/* Payment Card */}
        <ThemedView backgroundColor="white" style={styles.paymentCard}>
          {/* Pay to section */}
          <View style={styles.payToSection}>
            <ThemedText variant="bodyEmphasized" color="gray900" style={styles.payToLabel}>
              Pay to {paymentRequest?.merchant?.name || ''}
            </ThemedText>
            {/* <ThemedText variant="titleSmallEmphasized" color="gray900" style={styles.upiId}>
              {paymentRequest?.merchant?.name?.toLowerCase().replace(/\s+/g, '')}@upi
            </ThemedText> */}
          </View>

          {/* Amount */}
          <View style={styles.amountContainer}>
            <ThemedText variant="boldHighlightText" color="gray900" style={styles.amount}>
              {/* {paymentRequest?.amount_breakdown?.currency}{' '} */}
              {paymentRequest?.amount_breakdown?.total_payable.toLocaleString()}
            </ThemedText>
          </View>

          {/* Points Badge */}
          <LinearGradient
            style={{
              borderRadius: 50,
              padding: 1,
              marginBottom: 24,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
              theme.secondary700,
              theme.secondary600,
              theme.secondary200,
              theme.secondary700,
            ]}>
            <ThemedView backgroundColor="secondary100" style={styles.pointsBadge}>
              <View style={styles.coinsIcon}>
                <Image
                  source={require('@/assets/images/elite-card/coin-bundle-icon.png')}
                  style={styles.coinsIcon}
                />
              </View>
              <View style={styles.pointsTextContainer}>
                <ThemedText variant="boldHighlightTextXxs" color="secondary950">
                  {paymentRequest?.reward?.points_to_credit} Points{' '}
                  <ThemedText variant="bodyEmphasized" color="secondary950">
                    will be credited to your {paymentRequest?.reward?.card_type} card
                  </ThemedText>
                </ThemedText>
              </View>
            </ThemedView>
          </LinearGradient>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <Pressable
              style={[
                styles.button,
                styles.primaryButton,
                { backgroundColor: theme.primary },
                (isExpired || isPaused || isVerifyingOrder) && styles.disabledButton,
              ]}
              onPress={handleContinueToPay}
              disabled={isExpired || isPaused || isVerifyingOrder}>
              <ThemedText variant="titleSmallEmphasized" color="white">
                {isPaused || isVerifyingOrder ? 'Processing...' : 'Continue to Pay'}
              </ThemedText>
            </Pressable>

            <Pressable
              style={styles.dismissButton}
              onPress={handleDismiss}
              disabled={isPaused || isVerifyingOrder}>
              <ThemedText variant="bodySmallEmphasized" color="primary600">
                Dismiss
              </ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: SPACING.screenBottom,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  greetingContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
  },
  requestDetailsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  requestTitle: {
    marginBottom: 4,
  },
  requestSubtitle: {
    textAlign: 'center',
  },
  priceBreakdownContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  savingsBadge: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 24,
    gap: 8,
  },
  savingsIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00A63E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentCard: {
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  payToSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  payToLabel: {
    marginBottom: 4,
  },
  upiId: {
    fontWeight: '600',
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  amount: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '700',
  },
  pointsBadge: {
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,

    gap: 12,
  },
  coinsIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsTextContainer: {
    flex: 1,
  },
  actionsContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    shadowColor: '#253D8F',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  dismissButton: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default PaymentRequestScreen;
