import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import PaymentFailed from '@/assets/svgs/payment-failed.svg';
import PaymentSuccess from '@/assets/svgs/payment-success.svg';
import { ThemedText } from '@/components/common/ThemedText';
import CarwashDetailCard from '@/components/service/carwash/carwash-detail-card';
import { Box, Device, useSafeAreaInsets } from '@/core';
import { useTheme } from '@/hooks/useTheme';

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
  const { bottomHeight } = useSafeAreaInsets();
  const { theme } = useTheme();
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
    result,
  } = useLocalSearchParams();
  const isSuccess = result === 'success';
  const selectedService = service ? JSON.parse(service) : null;

  const handleGoHome = () => {
    router.replace('/(main)/(tab)');
  };

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
        <ThemedText style={styles.messageText} color="white" variant="body">
          {isSuccess
            ? 'Your booking has been confirmed. You can view your booking details below.'
            : 'Your booking has been failed. Please try again.'}
        </ThemedText>
      </Box>

      <Box style={styles.fullWidth}>
        <CarwashDetailCard
          image={image as string}
          name={header as string}
          place={place as string}
          vehicleType={vehicleType as string}
          date={date as string}
          timeslot={time_slot_id as string}
          features={selectedService?.name}
        />
      </Box>
      <Pressable
        style={[styles.buttonWhite, { bottom: bottomHeight || 20 }]}
        onPress={handleGoHome}>
        <ThemedText color="gray900" variant="bodyEmphasized">
          Home
        </ThemedText>
      </Pressable>
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
    position: 'absolute',

    left: 20,
    height: 44,
    width: Device.width - 40,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
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
