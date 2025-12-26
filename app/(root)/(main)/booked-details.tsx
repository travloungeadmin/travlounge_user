import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import { ThemedText } from '@/components/common/ThemedText';
import Header from '@/components/header';
import SleepingPodPaymentTopCard from '@/components/service/sleeping-pod-payment-top-card';
import { shadow } from '@/constants';
import { Box, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import useUserStore from '@/modules/user';
import Loading from '@/old/components/common/Loading';
import { cancelBooking, getBookingDetail, rePayPod } from '@/services/query/booking';
import { verifySleepingPodOrder } from '@/services/query/service';

const BillingDetails = (props) => {
  const { repayLoading, priceData, total, onPressPayNow, enableBookingButton } = props;
  const { theme } = useTheme();

  return (
    <Box
      style={[
        {
          padding: 16,
          backgroundColor: theme.backgroundCard,
          margin: 16,
          borderRadius: 8,
          gap: 10,
        },
        shadow,
      ]}>
      <ThemedText variant="bodySmallEmphasized" color="gray900">
        Billing Details
      </ThemedText>
      <Box gap={5}>
        {priceData?.items.map((item) => (
          <Row style={{ justifyContent: 'space-between' }}>
            <ThemedText variant="bodySmall" color="gray900">
              {item.type}
            </ThemedText>
            <ThemedText variant="bodySmall" color="gray900">
              {item.rate} X {item.quantity} = {item.rate * item.quantity}
            </ThemedText>
          </Row>
        ))}
        <Row style={{ justifyContent: 'space-between' }}>
          <ThemedText variant="bodySmall" color="gray900">
            Discount
          </ThemedText>
          <ThemedText variant="bodySmall" color="gray900">
            -{priceData.discount}
          </ThemedText>
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          <ThemedText variant="bodySmall" color="gray900">
            Gst
          </ThemedText>
          <ThemedText variant="bodySmall" color="gray900">
            {priceData?.tax_rate * 100}%={priceData.tax}
          </ThemedText>
        </Row>
        {priceData?.addons.map((item) => (
          <Row style={{ justifyContent: 'space-between' }}>
            <ThemedText variant="bodySmall" color="gray900">
              {item.quantity} Add On Bath
            </ThemedText>
            <ThemedText variant="bodySmall" color="gray900">
              {item.rate} X {item.quantity} = {item.total}
            </ThemedText>
          </Row>
        ))}
      </Box>

      <Row style={{ justifyContent: 'space-between' }}>
        <ThemedText variant="bodySmallEmphasized" color="gray900">
          Total
        </ThemedText>
        <ThemedText variant="bodySmallEmphasized" color="gray900">
          {total}
        </ThemedText>
      </Row>
      {enableBookingButton && (
        <Box gap={10}>
          <Box style={{ height: 1, backgroundColor: 'rgba(37, 61, 143, 0.3)', flex: 1 }} />
          <ThemedText variant="bodySmall" color="gray900">
            The payment attempt failed due to technical issue. Please complete the Payment
          </ThemedText>
          <Pressable
            onPress={onPressPayNow}
            style={{
              height: 40,
              backgroundColor: '#rgba(37, 61, 143, 1)',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            {repayLoading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <ThemedText variant="bodySmallEmphasized" color="white">
                Pay Now
              </ThemedText>
            )}
          </Pressable>
        </Box>
      )}
    </Box>
  );
};

const CancellationTerms = ({ isLoading, onPressCancel }) => {
  const { theme } = useTheme();
  return (
    <Box
      style={{
        margin: 16,
        borderRadius: 8,
        backgroundColor: theme.backgroundCard,
        padding: 16,
        ...shadow,
        gap: 10,
      }}>
      <ThemedText variant="bodySmallEmphasized" color="gray900">
        Cancellation terms
      </ThemedText>
      <ThemedText variant="bodySmall" color="gray900">
        You can cancel your booking up to 24 hours before the check-in time. After that, the booking
        is non-refundable.
      </ThemedText>
      <Pressable
        disabled={isLoading}
        onPress={onPressCancel}
        style={{
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          width: 150,
          backgroundColor: '#253D8F', // Darker background color
          paddingHorizontal: 20,
          paddingVertical: 10,
          alignSelf: 'flex-end',
          borderRadius: 20,
        }}>
        {isLoading ? (
          <ActivityIndicator color="#3C3C3C" size="small" />
        ) : (
          <ThemedText variant="bodySmall" color="white">
            Cancel Booking
          </ThemedText>
        )}
      </Pressable>
    </Box>
  );
};

const CancelledOnCard = ({ canceledAt }) => {
  const { theme } = useTheme();
  return (
    <Row
      style={{
        backgroundColor: theme.backgroundCard,
        margin: 16,
        padding: 16,
        borderRadius: 8,
        ...shadow,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ThemedText variant="titleEmphasized" color="error">
        Cancelled
      </ThemedText>
      <ThemedText variant="bodySmallEmphasized" color="gray900">
        on {canceledAt}
      </ThemedText>
    </Row>
  );
};

const BookedDetails = () => {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const { mutate, isPending, isSuccess } = cancelBooking();
  const { mutate: rePayMutation, isPending: repayLoading } = rePayPod();
  const { user } = useUserStore();

  const { mutate: verifyMutation } = verifySleepingPodOrder();
  const { data, isLoading, refetch } = getBookingDetail({
    id,
    isSleepingPod: true,
  });

  const cancelHandler = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking? This action cannot be undone.',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            mutate(
              { id },
              {
                onSuccess: () => {
                  refetch();
                },
              }
            );
          },
        },
      ]
    );
  };

  const handleRazorpay = async ({ id, amount, date, duration, image, location, name, time }) => {
    const options = {
      // description: "Credits towards consultation",
      // image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: 'INR',
      key: process.env.EXPO_PUBLIC_RAZOR_PAY_KEY_ID,
      amount: amount * 100,
      name: 'Travlounge',
      order_id: id,
      prefill: {
        // email: "gaurav.kumar@example.com",
        contact: user?.mobile_number,
        name: user?.name,
      },
      // theme: { color: "#53a20e" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        verifyMutation(
          {
            razorpay_order_id: data.razorpay_order_id as string,
            razorpay_payment_id: data.razorpay_payment_id as string,
            razorpay_signature: data.razorpay_signature as string,
          },
          {
            onSuccess({ data }) {
              router.replace({
                pathname: '/(root)/(main)/payment-result',
                params: {
                  id: data.booking_id,
                  image: data.image_url,
                  name: data.name,
                  location: data.location,
                  date: data.date,
                  time: data.time,
                  duration: data.duration,
                  status: 'success',
                },
              });
            },
          }
        );
      })
      .catch(() => {
        router.replace({
          pathname: '/(root)/(main)/payment-result',
          params: {
            status: 'failed',
            id,
            image,
            name,
            location,
            date,
            time,
            duration,
          },
        });
      });
  };

  return (
    <Box style={{ backgroundColor: theme.backgroundPrimary, flex: 1 }}>
      <Header back title="Booking Details" />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <SleepingPodPaymentTopCard
            id={id}
            date={data?.check_in_date}
            duration={data?.duration}
            image={data?.image[0]}
            location={data?.location}
            name={data?.pod_name}
            // time={data.location}
            time={data?.arrival_time}
          />
          <BillingDetails
            repayLoading={repayLoading}
            onPressPayNow={() => {
              rePayMutation(
                { id },
                {
                  onSuccess: (res) => {
                    handleRazorpay({
                      id: res.razorpay_order_id,
                      amount: res.amount,
                      date: data?.check_in_date,
                      duration: data?.duration,
                      image: data?.image[0],
                      location: data?.location,
                      name: data?.pod_name,
                      time: data?.arrival_time,
                    });
                  },
                }
              );
            }}
            enableBookingButton={data?.payment_status === 'PENDING'}
            total={data?.amount}
            priceData={data?.billing_details}
          />
          {data?.cancellable && (
            // data?.payment_status === 'CONFIRMED' &&
            // data?.status !== 'CANCELLED' &&
            <CancellationTerms onPressCancel={cancelHandler} isLoading={isPending || isSuccess} />
          )}
          {data?.status === 'CANCELLED' && <CancelledOnCard canceledAt={data.canceled_at} />}

          {data?.refund_status && (
            <Row
              style={{
                backgroundColor: theme.backgroundCard,
                marginHorizontal: 16,
                marginBottom: 16,
                padding: 12,
                borderRadius: 8,
                ...shadow,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ThemedText variant="bodySmallEmphasized" color="primary">
                Refund Status:
              </ThemedText>
              <ThemedText variant="bodySmallEmphasized" color="gray900" style={{ marginLeft: 8 }}>
                {typeof data.refund_status === 'string' && data.refund_status.length > 0
                  ? data.refund_status.charAt(0).toUpperCase() + data.refund_status.slice(1)
                  : data.refund_status}
              </ThemedText>
            </Row>
          )}
        </ScrollView>
      )}
    </Box>
  );
};

export default BookedDetails;

const styles = StyleSheet.create({});
