import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import AdditionalCharge from '@/assets/svgs/additional-charge.svg';
import CoupleNotAllowed from '@/assets/svgs/couple-not-allowed.svg';
import IdCard from '@/assets/svgs/id-card.svg';
import NoDrugs from '@/assets/svgs/no-drugs.svg';
import NoFoods from '@/assets/svgs/no-food.svg';
import NoSmoking from '@/assets/svgs/no-smocking.svg';
import Silent from '@/assets/svgs/phone-silent.svg';
import WakeUp from '@/assets/svgs/wake-up.svg';
import Wallet from '@/assets/svgs/wallet.svg';
import { ThemedText } from '@/components/common/ThemedText';
import Header from '@/components/header';
import PriceDistribution from '@/components/service/price-distribution';
import SleepingPodPaymentTopCard from '@/components/service/sleeping-pod-payment-top-card';
import { shadow } from '@/constants';
import { Box, Device, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import { showError } from '@/lib/toast';
import useUserStore from '@/modules/user';
import { createSleepingPodOrder, verifySleepingPodOrder } from '@/services/query/service';

const rules = [
  { id: 1, icon: Silent, desc: 'Use mobile phones without disturbing others' },
  {
    id: 2,
    icon: CoupleNotAllowed,
    desc: 'Couples not allowed in single pods',
  },
  {
    id: 3,
    icon: NoSmoking,
    desc: 'Smoking is strictly prohibited.',
  },
  {
    id: 4,
    icon: NoDrugs,
    desc: 'Drugs and illegal substances are prohibited.',
  },
  {
    id: 5,
    icon: NoFoods,
    desc: 'Food consumption inside the pods is prohibited.',
  },
];
const procedures = [
  {
    id: 1,
    icon: IdCard,
    desc: 'Valid address proof and a mobile number are required for check-in.',
  },
  { id: 2, icon: Wallet, desc: 'Payments must be completed in advance.' },
  {
    id: 3,
    icon: WakeUp,
    desc: 'Customers are responsible for managing their own wake-up times.',
  },
  {
    id: 4,
    icon: AdditionalCharge,
    desc: 'Checkout within 15 minutes of your allocated time to avoid additional charges.',
  },
];

type propsType = {
  image: string;
  name: string;
  location: string;
  date: string;
  time: string;
  duration: number | string;
  id: string;
};

const Rules = () => {
  return (
    <Box>
      <ThemedText variant="bodySmallEmphasized" color="gray900" style={styles.rulesTitle}>
        Sleeping pods rules and guidelines
      </ThemedText>
      <Row style={styles.rulesContainer}>
        {rules.map((rule) => (
          <Box key={rule.id} gap={16} style={styles.ruleBox}>
            <rule.icon />
            <ThemedText style={styles.ruleText} variant="bodySmall" color="gray900">
              {rule.desc}
            </ThemedText>
          </Box>
        ))}
      </Row>
    </Box>
  );
};

const Procedures = () => {
  const { theme } = useTheme();
  return (
    <Box style={[styles.proceduresContainer, { backgroundColor: theme.backgroundCard }, shadow]}>
      <ThemedText variant="bodySmallEmphasized" color="gray900" style={styles.proceduresTitle}>
        Check-in and check-out procedures
      </ThemedText>
      <Box style={styles.proceduresContent}>
        {procedures.map((procedure) => (
          <Row key={procedure.id} gap={16} style={styles.procedureRow}>
            <procedure.icon />
            <ThemedText style={styles.procedureText} variant="bodySmall" color="gray900">
              {procedure.desc}
            </ThemedText>
          </Row>
        ))}
      </Box>
    </Box>
  );
};

const sleepingPodPolicies = [
  {
    title: 'Cancellation Policy (12-Hour Plan)',
    details: [
      'Cancellations made 24+ hours before check-in: Full refund.',
      'Cancellations within 24 hours of check-in: Non-refundable.',
    ],
  },
  {
    title: 'Late Arrivals',
    details: [
      'Check-in time begins as per the booking confirmation.',
      'No refunds or discounts for late arrivals. Reservation time remains fixed and charged in full.',
      'If delayed, contact customer service for assistance (adjustments subject to availability).',
    ],
  },
  {
    title: 'Refund Processing',
    details: [
      'Refunds to the original payment method within 5 business days.',
      'Time to reflect on statements may vary by bank.',
    ],
  },
  {
    title: 'Force Majeure',
    details: [
      'For natural disasters or uncontrollable events, reservations may be adjusted, canceled, or refunded at Travlounge’s discretion.',
    ],
  },
];

const Policies = () => {
  return (
    <Box style={{ paddingHorizontal: 16 }}>
      <ThemedText variant="bodySmallEmphasized" color="gray900" style={{ marginBottom: 10 }}>
        Sleeping Pod Refund Policy
      </ThemedText>
      {sleepingPodPolicies.map((policy, index) => (
        <Box key={index} style={{ marginBottom: 10 }}>
          <ThemedText variant="bodySmallEmphasized" color="gray900">
            {policy.title}
          </ThemedText>
          {policy.details.map((detail, i) => (
            <ThemedText key={i} variant="bodySmall" color="gray900" style={{ marginLeft: 10 }}>
              • {detail}
            </ThemedText>
          ))}
        </Box>
      ))}
    </Box>
  );
};

const SleepingPodPayment = () => {
  const { id, image, name, location, priceData, date, duration, time, list_of_pods, no_of_baths } =
    useLocalSearchParams();

  const { user } = useUserStore();
  const { theme } = useTheme();
  const { mutate, isPending } = createSleepingPodOrder();
  const { mutate: verifyMutation } = verifySleepingPodOrder();

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
            id,
            image,
            name,
            location,
            date,
            time,
            duration,
            status: 'failed',
          },
        });
      });
  };

  const handlePayment = () => {
    Alert.alert('Confirm Payment', 'Do you want to proceed with the payment?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Proceed',
        onPress: () => {
          mutate(
            {
              user_id: user?.id as string,
              listing_id: id as string,
              amount: JSON.parse(priceData).payable_amount,
              date: date as string,
              time: time as string,
              pod_info: JSON.parse(priceData).available_pods,
              duration,
              discount_amount: JSON.parse(priceData).discount_amount,
              subtotal: JSON.parse(priceData).subtotal,
              tax: JSON.parse(priceData).tax,
              total_add_ons_price: JSON.parse(priceData).total_add_ons_price,
              payable_amount: JSON.parse(priceData).payable_amount,
              add_ons: JSON.parse(priceData).add_ons,
            },
            {
              onSuccess: (data) => {
                if (data?.is_profile_completed) {
                  handleRazorpay({
                    id: data.order_id,
                    amount: JSON.parse(priceData).payable_amount,
                  });
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
                showError(
                  'Error',
                  error?.message || 'Something went wrong. Please try again later.'
                );
              },
            }
          );
        },
      },
    ]);
  };

  return (
    <Box style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
      <Header title={name || 'Payment'} back location />
      <ScrollView>
        <SleepingPodPaymentTopCard
          id={id}
          date={date}
          duration={duration}
          image={image}
          location={location}
          name={name}
          time={time}
        />
        <Rules />
        <Procedures />
        <Policies />
      </ScrollView>
      <Box style={[styles.paymentContainer, { backgroundColor: theme.backgroundCard }, shadow]}>
        <PriceDistribution isGst priceData={JSON.parse(priceData)} />
        <Pressable onPress={handlePayment} style={styles.paymentButton}>
          {isPending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <ThemedText color="white" variant="bodyEmphasized" style={styles.paymentButtonText}>
              Make Payment
            </ThemedText>
          )}
        </Pressable>
      </Box>
    </Box>
  );
};

export default SleepingPodPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.backgroundPrimary,
  },
  topCard: {
    padding: 16,
    margin: 16,
    // backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 8,
    gap: 16,
  },
  image: {
    width: 47,
    height: 47,
    borderRadius: 4,
  },
  centeredBox: {
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(37, 61, 143, 0.3)',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  rulesTitle: {
    margin: 16,
    textAlign: 'center',
  },
  rulesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 30,
    padding: 16,
    columnGap: 16,
  },
  ruleBox: {
    width: (Device.width - 64) / 3,
    alignItems: 'center',
  },
  ruleText: {
    textAlign: 'center',
  },
  proceduresContainer: {
    // backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 8,
    margin: 16,
    padding: 16,
  },
  proceduresTitle: {
    margin: 16,
    textAlign: 'center',
  },
  proceduresContent: {
    gap: 30,
    padding: 16,
    columnGap: 16,
  },
  procedureRow: {
    alignItems: 'center',
  },
  procedureText: {
    flex: 1,
  },
  paymentContainer: {
    // backgroundColor: colors.cardBackgroundPrimary,
    padding: 30,
  },
  paymentDivider: {
    height: 1,
    backgroundColor: 'rgba(37, 61, 143, 0.3)',
    marginVertical: 20,
  },
  totalRow: {
    marginTop: 10,
  },
  paymentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: '#253D8F',
    borderRadius: 22,
    marginTop: 20,
  },
  paymentButtonText: {
    textAlign: 'center',
    lineHeight: 44,
  },
});
