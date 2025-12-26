import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/common/ThemedText';
import CarwashDetailCard from '@/components/service/carwash/carwash-detail-card';
import { shadow } from '@/constants';
import useUserStore from '@/modules/user';
import { useCarWashBooking, useCarWashBookingVerify } from '@/services/query/car-wash';
import RazorpayCheckout from 'react-native-razorpay';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Payment = () => {
  const { mutate: bookCarWash, isPending } = useCarWashBooking();
  const { mutate: verifyMutation } = useCarWashBookingVerify();
  const { bottom } = useSafeAreaInsets();
  const { user } = useUserStore();
  const {
    id,
    vehicleTypeId,
    vehicleType,
    listing_id,
    service_id,
    time_slot_id,
    date,
    vehicle_number,
    header,
    place,
    service,
    image,
    paymentOptions,
  } = useLocalSearchParams();

  const handleRazorpay = async ({ id, amount }) => {
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
      .then((res) => {
        verifyMutation(
          {
            razorpay_order_id: res.razorpay_order_id as string,
            razorpay_payment_id: res.razorpay_payment_id as string,
            razorpay_signature: res.razorpay_signature as string,
          },
          {
            onSuccess({ data }) {
              router.push({
                pathname: '/(root)/(main)/services/carwash/car-wash-payment-result',
                params: {
                  id,
                  vehicleTypeId,
                  vehicleType,
                  listing_id,
                  time_slot_id,
                  date,
                  vehicle_number,
                  header,
                  place,
                  service: JSON.stringify(selectedService),
                  image,
                  result: 'success',
                },
              });
            },
          }
        );
      })
      .catch(() => {
        router.push({
          pathname: '/(root)/(main)/services/carwash/car-wash-payment-result',
          params: {
            result: 'failed',
            id,
            vehicleTypeId,
            vehicleType,
            listing_id,
            time_slot_id,
            date,
            vehicle_number,
            header,
            place,
            service: JSON.stringify(selectedService),
            image,
          },
        });
      });
  };
  const selectedService = service ? JSON.parse(service) : null;

  return (
    <View style={{ flex: 1 }}>
      <CarwashDetailCard
        image={image as string}
        name={header as string}
        place={place as string}
        vehicleType={vehicleType as string}
        date={date as string}
        timeslot={time_slot_id as string}
        features={selectedService?.name}
      />
      <View
        style={[
          {
            paddingTop: 40,
            padding: 30,
            paddingBottom: bottom + 30,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            gap: 4,
          },
          shadow,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ThemedText variant="body" color="gray900">
            {selectedService?.name}
          </ThemedText>
          <ThemedText variant="body" color="gray900">
            {selectedService?.price_without_tax}
          </ThemedText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ThemedText variant="body" color="gray900">
            Discount
          </ThemedText>
          <ThemedText variant="body" color="gray900">
            -{selectedService?.discount}
          </ThemedText>
        </View>
        {selectedService?.tax_amount && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <ThemedText variant="body" color="gray900">
              Gst ({selectedService?.tax_rate * 100}%)
            </ThemedText>
            <ThemedText variant="body" color="gray900">
              {selectedService?.tax_amount}
            </ThemedText>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ThemedText variant="bodyEmphasized" color="gray900">
            Total
          </ThemedText>
          <ThemedText variant="bodyEmphasized" color="gray900">
            {selectedService?.discounted_price}
          </ThemedText>
        </View>
        <Pressable
          disabled={isPending}
          style={{
            height: 44,
            backgroundColor: '#253D8F',
            borderRadius: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
          onPress={() => {
            bookCarWash(
              {
                paymentOptions: paymentOptions as
                  | 'subscription'
                  | 'online_payment'
                  | 'pay_at_service_center',
                service_id: selectedService.id as string,
                listing_id: id as string,
                vehicle_number: vehicle_number as string,
                car_id: vehicleTypeId as string,
                time: time_slot_id as string,
                date: date as string,
                amount: selectedService?.price,
                final_amount: selectedService?.discounted_price,
                travlounge_percentage: selectedService?.travlounge_percentage,
              },
              {
                onSuccess: (result) => {
                  if (result?.is_profile_completed) {
                    if (paymentOptions === 'online_payment') {
                      if (result?.is_subscription) {
                        router.push({
                          pathname: '/(root)/(main)/services/carwash/car-wash-payment-result',
                          params: {
                            id,
                            vehicleTypeId,
                            vehicleType,
                            listing_id,
                            time_slot_id,
                            date,
                            vehicle_number,
                            header,
                            place,
                            service: JSON.stringify(selectedService),
                            image,
                            result: 'success',
                          },
                        });
                      } else {
                        handleRazorpay({
                          id: result?.order_id,
                          amount: result?.original_request?.final_amount,
                        });
                      }
                    } else {
                      router.push({
                        pathname: '/(root)/(main)/services/carwash/car-wash-payment-result',
                        params: {
                          id,
                          vehicleTypeId,
                          vehicleType,
                          listing_id,
                          time_slot_id,
                          date,
                          vehicle_number,
                          header,
                          place,
                          service: JSON.stringify(selectedService),
                          image,
                          result: 'success',
                        },
                      });
                    }
                  } else {
                    Alert.alert(
                      'Profile Incomplete',
                      'Please complete your profile before proceeding to payment.',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Go to Profile',
                          onPress: () => {
                            router.navigate({
                              pathname: '/(root)/(main)/old/edit-profile',
                              params: { type: 'edit' },
                            });
                          },
                        },
                      ]
                    );
                  }
                },
                onError: (error) => {
                  router.push({
                    pathname: '/(root)/(main)/services/carwash/car-wash-payment-result',
                    params: {
                      result: 'failed',
                      id,
                      vehicleTypeId,
                      vehicleType,
                      listing_id,
                      time_slot_id,
                      date,
                      vehicle_number,
                      header,
                      place,
                      service: JSON.stringify(selectedService),
                      image,
                    },
                  });
                },
              }
            );
          }}>
          {isPending ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <ThemedText variant="bodyEmphasized" color="white">
              Confirm Booking
            </ThemedText>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({});
