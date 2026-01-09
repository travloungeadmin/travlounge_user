import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import PaymentFailed from '@/assets/svgs/payment-failed.svg';
import PaymentSuccess from '@/assets/svgs/payment-success.svg';
import { ThemedText } from '@/components/common/ThemedText';
import CafeResultView from '@/components/payment/cafe-result-view';
import SleepingPodPaymentTopCard from '@/components/service/sleeping-pod-payment-top-card';
import { shadow } from '@/constants';
import { Box, Device, Row, useSafeAreaInsets } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import useSleepingPodCart from '@/modules/sleeping-pod';
import useUserStore from '@/modules/user';
import {
  useConfirmTolooEvent,
  useCreateServicePayment,
  useVerifyServicePayment,
} from '@/services/query/payment';

interface PaymentResultParams {
  id: string;
  image: string;
  name: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  wallet_balance: string;
  required_amount: string;
  message: string;
  is_popup: string;
  service_name: string;
  service_type_name: string;
  pay_now: string;
  amount: string;
  event_payload: string;
  booking_id?: string;
}

const PaymentResult = () => {
  const params = useLocalSearchParams();
  const [paymentParams, setPaymentParams] = useState<PaymentResultParams>({
    id: '',
    image: '',
    name: '',
    location: '',
    date: '',
    time: '',
    duration: '',
    status: '',
    wallet_balance: '',
    required_amount: '',
    message: '',
    is_popup: '',
    service_name: '',
    service_type_name: '',
    pay_now: '',
    amount: '',
    event_payload: '',
  });

  useEffect(() => {
    setPaymentParams({
      id: (params.id as string) || '',
      image: (params.image as string) || '',
      name: (params.name as string) || '',
      location: (params.location as string) || '',
      date: (params.date as string) || '',
      time: (params.time as string) || '',
      duration: (params.duration as string) || '',
      status: (params.status as string) || '',
      wallet_balance: (params.wallet_balance as string) || '',
      required_amount: (params.required_amount as string) || '',
      message: (params.message as string) || '',
      is_popup: (params.is_popup as string) || '',
      service_name: (params.service_name as string) || '',
      service_type_name: (params.service_type_name as string) || '',
      pay_now: (params.pay_now as string) || '',
      amount: (params.amount as string) || '',
      event_payload: (params.event_payload as string) || '',
    });
  }, []);

  console.log({ service_name: params.service_name });

  const { mutate: createPayment } = useCreateServicePayment();
  const { mutate: verifyPayment } = useVerifyServicePayment();
  const { mutate: confirmEvent } = useConfirmTolooEvent();
  const { user } = useUserStore();
  const { resetState } = useSleepingPodCart();
  const { bottomHeight } = useSafeAreaInsets();
  const { theme } = useTheme();

  const isSuccess = paymentParams.status === 'success';
  const isPopUp = paymentParams.is_popup === 'true';
  const isTolooORCafe =
    paymentParams.service_name === 'toloo' ||
    paymentParams.service_name === 'bean_wagon' ||
    paymentParams.service_name === 'cafe';

  const handleGoHome = () => {
    resetState();
    router.replace('/(main)/(tab)');
  };

  const handleRazorpay = async ({
    id,
    booking_id,
    required_amount,
    event_payload,
  }: PaymentResultParams) => {
    const options = {
      currency: 'INR',
      key: process.env.EXPO_PUBLIC_RAZOR_PAY_KEY_ID || '',
      amount: parseInt(required_amount) * 100,
      name: 'Travlounge',
      order_id: booking_id || '',
      prefill: {
        contact: user?.mobile_number,
        name: user?.name,
      },
    };

    try {
      const res = await RazorpayCheckout.open(options);
      verifyPayment(
        {
          razorpay_order_id: res.razorpay_order_id,
          razorpay_payment_id: res.razorpay_payment_id,
          razorpay_signature: res.razorpay_signature,
          amount: required_amount,
          event_payload:
            typeof event_payload === 'string' ? JSON.parse(event_payload) : event_payload,
        },
        {
          onSuccess({ data }) {
            setPaymentParams((prev) => ({
              ...prev,
              status: 'success',
              message: '',
              pay_now: 'false',
            }));
          },
        }
      );
    } catch (error) {
      setPaymentParams((prev) => ({
        ...prev,
        status: 'failed',
        message: '',
        pay_now: 'false',
      }));
    }
  };

  const handleTolooPay = () => {
    const parsedEventPayload =
      typeof paymentParams.event_payload === 'string'
        ? JSON.parse(paymentParams.event_payload)
        : undefined;

    createPayment(
      {
        amount: parseInt(paymentParams.required_amount),
        event_payload: parsedEventPayload,
      },
      {
        onSuccess: (data) => {
          handleRazorpay({
            ...paymentParams,
            booking_id: data.order_id,
          });
        },
        onError: () => {
          setPaymentParams((prev) => ({
            ...prev,
            status: 'failed',
            pay_now: 'false',
          }));
        },
      }
    );
  };

  const handleBookMore = () => {
    if (params.service_name === 'car_wash') {
      router.replace({
        pathname: '/services/car-wash',
        params: { id: params.id, header: params.header, place: params.place, image: params.image },
      });

      return;
    }
    resetState();
    router.replace('/services/sleeping-pod');
  };
  const handleAddMoney = () => router.navigate('/(main)/old/wallet');
  const handleAddSubscription = () =>
    router.replace({ pathname: '/old/packge', params: { isPlans: 'true' } });
  console.log(params?.cafeData);

  return (
    <Box style={[styles.container, { backgroundColor: isSuccess ? '#253D8F' : '#8B0000' }]}>
      <Pressable style={styles.closeButton} onPress={() => router.replace('/')}>
        <Ionicons name="close" size={24} color="#fff" />
      </Pressable>

      {isSuccess ? <PaymentSuccess /> : <PaymentFailed />}

      <Box style={styles.messageContainer} gap={10}>
        <ThemedText color="white" variant="headlineSmallEmphasized">
          {isSuccess ? 'Booking Confirmed' : 'Booking Failed'}
        </ThemedText>
        <ThemedText style={styles.messageText} color="white" variant="bodyEmphasized">
          {paymentParams.message ||
            (isSuccess
              ? 'Your booking has been confirmed. You can view your booking details below.'
              : 'Your booking has been failed. Please try again.')}
        </ThemedText>
      </Box>

      <Box style={styles.fullWidth}>
        {params?.service_name === 'bean_wagon' ? (
          <FlatList
            data={params?.cafeData ? JSON.parse(params.cafeData as string) : []}
            renderItem={({ item }) => (
              <Box
                key={item.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0',
                }}>
                <ThemedText variant="bodyLargeEmphasized" color="gray900">
                  {item.name} x {item.quantity}
                </ThemedText>
                <ThemedText variant="bodyLargeEmphasized" color="gray900">
                  ₹ {item.price * item.quantity}
                </ThemedText>
              </Box>
            )}
          />
        ) : params?.service_name === 'buffet' || params?.service_name === 'cafe' ? (
          <View
            style={{
              alignItems: 'center',
            }}>
            <CafeResultView
              data={params?.list ? JSON.parse(params.list as string) : []}
              image={params?.image as string}
              name={params?.name as string}
              location={params?.location as string}
            />
          </View>
        ) : (
          <SleepingPodPaymentTopCard
            service_name={params.service_name as string}
            isToloo={isTolooORCafe}
            id={paymentParams.id}
            date={paymentParams.date}
            duration={parseInt(paymentParams.duration) || 0}
            image={paymentParams.image}
            location={paymentParams.location}
            name={isTolooORCafe ? paymentParams.service_type_name : paymentParams.name}
            time={paymentParams.time}
          />
        )}
      </Box>

      {!isSuccess && paymentParams.required_amount && paymentParams.wallet_balance && (
        <Row style={[styles.balanceBox, shadow, { backgroundColor: theme.backgroundCard }]}>
          <Box gap={5}>
            <ThemedText color="gray900" variant="bodyEmphasized">
              Current Balance
            </ThemedText>
            <ThemedText color="gray900" variant="bodyLargeEmphasized">
              ₹ {paymentParams.wallet_balance}
            </ThemedText>
          </Box>
          <Box gap={5}>
            <ThemedText color="gray900" variant="bodyEmphasized">
              Balance Required
            </ThemedText>
            <ThemedText color="gray900" variant="bodyLargeEmphasized">
              ₹ {paymentParams.required_amount}
            </ThemedText>
          </Box>
        </Row>
      )}

      {
        isSuccess || paymentParams.pay_now === 'false' ? (
          <Row gap={20} style={[styles.footerContainer, { bottom: bottomHeight || 20 }]}>
            {!isTolooORCafe && params?.service_name !== 'buffet' && (
              <Pressable style={styles.buttonWhite} onPress={handleBookMore}>
                <ThemedText color="gray900" variant="titleEmphasized">
                  Book more
                </ThemedText>
              </Pressable>
            )}
            <Pressable style={styles.buttonWhite} onPress={handleGoHome}>
              <ThemedText color="gray900" variant="titleEmphasized">
                Home
              </ThemedText>
            </Pressable>
          </Row>
        ) : paymentParams.service_name === 'toloo' ? (
          paymentParams.pay_now === 'true' ? (
            <Pressable style={styles.buttonWhiteFull} onPress={handleTolooPay}>
              <ThemedText color="primary" variant="titleEmphasized">
                Pay Now
              </ThemedText>
            </Pressable>
          ) : null
        ) : null
        // <Box style={[styles.retryContainer, { bottom: bottomHeight || 20 }]}>
        //   <Pressable style={styles.transparentButton} onPress={handleAddMoney}>
        //     <Text color="#fff" preset="POP_16_SB">
        //       Add Money to Wallet
        //     </Text>
        //   </Pressable>
        //   <Pressable style={styles.buttonWhiteFull} onPress={handleAddSubscription}>
        //     <Text color="#253D8F" preset="POP_16_SB">
        //       Add Subscription
        //     </Text>
        //   </Pressable>
        // </Box>
      }
    </Box>
  );
};

export default PaymentResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  closeButton: {
    position: 'absolute',
    zIndex: 1,
    top: 60,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  messageContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  messageText: {
    width: '60%',
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  balanceBox: {
    // backgroundColor: colors.cardBackgroundPrimary,
    padding: 20,
    margin: 20,
    borderRadius: 8,
    width: Device.width - 40,
    justifyContent: 'space-between',
  },
  footerContainer: {
    position: 'absolute',
    marginHorizontal: 20,
  },
  retryContainer: {
    position: 'absolute',
    marginHorizontal: 20,
    gap: 16,
  },
  buttonWhite: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonWhiteFull: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: Device.width - 40,
  },
  transparentButton: {
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    width: Device.width - 40,
  },
});
