import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import Header from '@/components/header';
import SleepingPodPaymentTopCard from '@/components/service/sleeping-pod-payment-top-card';
import { shadow } from '@/constants';
import { Box, Row, Text } from '@/core';
import useUserStore from '@/modules/user';
import Loading from '@/old/components/common/Loading';
import { cancelBooking, getBookingDetail, rePayPod } from '@/services/query/booking';
import { verifySleepingPodOrder } from '@/services/query/service';
import { colors } from '@/theme';

const BillingDetails = (props) => {
  const { repayLoading, priceData, total, onPressPayNow, enableBookingButton } = props;

  return (
    <Box
      style={[
        {
          padding: 16,
          backgroundColor: colors.cardBackgroundPrimary,
          margin: 16,
          borderRadius: 8,
          gap: 10,
        },
        shadow,
      ]}>
      <Text preset="POP_14_SB" color="#333333">
        Billing Details
      </Text>
      <Box gap={5}>
        {priceData?.items.map((item) => (
          <Row style={{ justifyContent: 'space-between' }}>
            <Text preset="POP_14_R" color="#333333">
              {item.type}
            </Text>
            <Text preset="POP_14_R" color="#333333">
              {item.rate} X {item.quantity} = {item.rate * item.quantity}
            </Text>
          </Row>
        ))}
        <Row style={{ justifyContent: 'space-between' }}>
          <Text preset="POP_14_R" color="#333333">
            Discount
          </Text>
          <Text preset="POP_14_R" color="#333333">
            -{priceData.discount}
          </Text>
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          <Text preset="POP_14_R" color="#333333">
            Gst
          </Text>
          <Text preset="POP_14_R" color="#333333">
            {priceData?.tax_rate * 100}%={priceData.tax}
          </Text>
        </Row>
        {priceData?.addons.map((item) => (
          <Row style={{ justifyContent: 'space-between' }}>
            <Text preset="POP_14_R" color="#333333">
              {item.quantity} Add On Bath
            </Text>
            <Text preset="POP_14_R" color="#333333">
              {item.rate} X {item.quantity} = {item.total}
            </Text>
          </Row>
        ))}
      </Box>

      <Row style={{ justifyContent: 'space-between' }}>
        <Text preset="POP_14_SB" color="#333333">
          Total
        </Text>
        <Text preset="POP_14_SB" color="#333333">
          {total}
        </Text>
      </Row>
      {enableBookingButton && (
        <Box gap={10}>
          <Box style={{ height: 1, backgroundColor: 'rgba(37, 61, 143, 0.3)', flex: 1 }} />
          <Text preset="POP_14_R" color="#333333">
            The payment attempt failed due to technical issue. Please complete the Payment
          </Text>
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
              <Text preset="POP_14_SB" color="#FFF">
                Pay Now
              </Text>
            )}
          </Pressable>
        </Box>
      )}
    </Box>
  );
};

const CancellationTerms = ({ isLoading, onPressCancel }) => {
  return (
    <Box
      style={{
        margin: 16,
        borderRadius: 8,
        backgroundColor: colors.cardBackgroundPrimary,
        padding: 16,
        ...shadow,
        gap: 10,
      }}>
      <Text color="#3C3C3C" preset="POP_14_SB">
        Cancellation terms
      </Text>
      <Text color="#3C3C3C" preset="POP_14_R">
        You can cancel your booking up to 24 hours before the check-in time. After that, the booking
        is non-refundable.
      </Text>
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
          <Text color="#fff" preset="POP_14_M">
            Cancel Booking
          </Text>
        )}
      </Pressable>
    </Box>
  );
};

const CancelledOnCard = ({ canceledAt }) => {
  return (
    <Row
      style={{
        backgroundColor: colors.cardBackgroundPrimary,
        margin: 16,
        padding: 16,
        borderRadius: 8,
        ...shadow,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text color="#881313" preset="POP_16_SB">
        Cancelled
      </Text>
      <Text color="#333333" preset="POP_14_SB">
        on {canceledAt}
      </Text>
    </Row>
  );
};

const BookedDetails = () => {
  const { id } = useLocalSearchParams();
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
    <Box style={{ backgroundColor: colors.backgroundPrimary, flex: 1 }}>
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
                backgroundColor: colors.cardBackgroundPrimary,
                marginHorizontal: 16,
                marginBottom: 16,
                padding: 12,
                borderRadius: 8,
                ...shadow,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text color="#253D8F" preset="POP_14_SB">
                Refund Status:
              </Text>
              <Text color="#333333" preset="POP_14_SB" style={{ marginLeft: 8 }}>
                {typeof data.refund_status === 'string' && data.refund_status.length > 0
                  ? data.refund_status.charAt(0).toUpperCase() + data.refund_status.slice(1)
                  : data.refund_status}
              </Text>
            </Row>
          )}
        </ScrollView>
      )}
    </Box>
  );
};

export default BookedDetails;

const styles = StyleSheet.create({});
