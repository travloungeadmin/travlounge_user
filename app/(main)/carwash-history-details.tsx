import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, ScrollView } from 'react-native';

import { ThemedText } from '@/components/common/ThemedText';
import Header from '@/components/header';
import { shadow } from '@/constants';
import { Box, Image, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import { showError } from '@/lib/toast';
import Loading from '@/old/components/common/Loading';
import { cancelCarwashBookingMutation } from '@/services/query/booking';
import type {
  BillingDetailsProps,
  CancellationTermsProps,
  CancelledOnCardProps,
  CarwashBookingData,
  CarwashTopCardProps,
  StatusCardProps,
  TimeSlotCardProps,
} from '@/types/screens/carwash-history-details.types';

const CarwashTopCard: React.FC<CarwashTopCardProps> = ({
  id,
  image,
  name,
  serviceType,
  quantity,
  vehicleNumber,
  carType,
}) => {
  const { theme } = useTheme();

  return (
    <Box
      style={[
        {
          margin: 16,
          borderRadius: 8,
          backgroundColor: theme.backgroundCard,
          padding: 16,
          gap: 16,
        },
        shadow,
      ]}>
      <Row style={{ gap: 16 }}>
        <Box style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden' }}>
          <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
        </Box>
        <Box style={{ flex: 1, gap: 8 }}>
          <ThemedText variant="titleEmphasized" color="primary">
            {name}
          </ThemedText>
          <ThemedText variant="bodySmall" color="gray900">
            Service: {serviceType}
          </ThemedText>
          {/* <ThemedText variant="bodySmall" color="gray900">
            Date: {date} • {bookingTime}
          </ThemedText> */}
          <ThemedText variant="bodySmall" color="gray900">
            Booking ID: #{id}
          </ThemedText>
        </Box>
      </Row>
      <Box style={{ backgroundColor: theme.backgroundTop, padding: 12, borderRadius: 8, gap: 8 }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <ThemedText variant="labelEmphasized" color="gray600">
            Vehicle Number:
          </ThemedText>
          <ThemedText variant="labelEmphasized" color="gray900">
            {vehicleNumber}
          </ThemedText>
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          <ThemedText variant="labelEmphasized" color="gray600">
            Car Type:
          </ThemedText>
          <ThemedText variant="labelEmphasized" color="gray900">
            {carType}
          </ThemedText>
        </Row>
      </Box>
    </Box>
  );
};

const BillingDetails: React.FC<BillingDetailsProps> = ({ items, total }) => {
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
        {items && items.length > 0 ? (
          items.map((item: any, index: number) => (
            <Row key={index} style={{ justifyContent: 'space-between' }}>
              <ThemedText variant="bodySmall" color="gray900">
                {item.type}
              </ThemedText>
              <ThemedText variant="bodySmall" color="gray900">
                {item.rate} X {item.quantity} = {item.rate * item.quantity}
              </ThemedText>
            </Row>
          ))
        ) : (
          <ThemedText variant="bodySmall" color="gray900">
            Service charges as per booking
          </ThemedText>
        )}
      </Box>

      {total && (
        <>
          <Box
            style={{ height: 1, backgroundColor: 'rgba(37, 61, 143, 0.3)', marginVertical: 8 }}
          />
          <Row style={{ justifyContent: 'space-between' }}>
            <ThemedText variant="bodySmallEmphasized" color="gray900">
              Total
            </ThemedText>
            <ThemedText variant="bodySmallEmphasized" color="gray900">
              ₹{total}
            </ThemedText>
          </Row>
        </>
      )}
    </Box>
  );
};

const StatusCard: React.FC<StatusCardProps> = ({ paymentStatus, bookingStatus }) => {
  const { theme } = useTheme();
  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED':
        return '#28A745';
      case 'PENDING':
        return '#FFA500';
      case 'CANCELLED':
        return '#DC3545';
      default:
        return '#6C757D';
    }
  };

  return (
    <Box
      style={[
        {
          margin: 16,
          borderRadius: 8,
          backgroundColor: theme.backgroundCard,
          padding: 16,
          gap: 12,
        },
        shadow,
      ]}>
      <ThemedText variant="bodySmallEmphasized" color="gray900">
        Status Information
      </ThemedText>

      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ThemedText variant="bodySmall" color="gray900">
          Payment Status
        </ThemedText>
        <Box
          style={{
            backgroundColor: getStatusColor(paymentStatus),
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
          }}>
          <ThemedText variant="labelEmphasized" color="white">
            {paymentStatus || 'N/A'}
          </ThemedText>
        </Box>
      </Row>

      {bookingStatus && (
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <ThemedText variant="bodySmall" color="gray900">
            Booking Status
          </ThemedText>
          <Box
            style={{
              backgroundColor: getStatusColor(bookingStatus),
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
            }}>
            <ThemedText variant="labelEmphasized" color="white">
              {bookingStatus}
            </ThemedText>
          </Box>
        </Row>
      )}
    </Box>
  );
};

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({ bookingTime, serviceDate }) => {
  const { theme } = useTheme();

  return (
    <Box
      style={[
        {
          margin: 16,
          borderRadius: 8,
          backgroundColor: theme.backgroundCard,
          padding: 16,
          gap: 12,
        },
        shadow,
      ]}>
      <ThemedText variant="bodySmallEmphasized" color="gray900">
        Scheduled Time
      </ThemedText>

      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ThemedText variant="bodySmall" color="gray600">
          Service Date
        </ThemedText>
        <ThemedText variant="bodySmallEmphasized" color="gray900">
          {serviceDate}
        </ThemedText>
      </Row>

      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ThemedText variant="bodySmall" color="gray600">
          Time Slot
        </ThemedText>
        <Box
          style={{
            backgroundColor: '#E8F4FD',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#253D8F',
          }}>
          <ThemedText variant="labelEmphasized" color="primary">
            {bookingTime}
          </ThemedText>
        </Box>
      </Row>
    </Box>
  );
};

const CancellationTerms: React.FC<CancellationTermsProps> = ({
  isLoading,
  onPressCancel,
  cancellable,
}) => {
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
        {cancellable
          ? 'You can cancel your car wash booking up to 2 hours before the scheduled time. After that, the booking is non-refundable.'
          : 'This booking cannot be cancelled at this time.'}
      </ThemedText>
      {cancellable && (
        <Pressable
          disabled={isLoading}
          onPress={onPressCancel}
          style={{
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
            backgroundColor: '#253D8F',
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignSelf: 'flex-end',
            borderRadius: 20,
          }}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <ThemedText variant="bodySmall" color="white">
              Cancel Booking
            </ThemedText>
          )}
        </Pressable>
      )}
    </Box>
  );
};

const CancelledOnCard: React.FC<CancelledOnCardProps> = ({ canceledAt }) => {
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

const CarwashHistoryDetails = () => {
  const { data } = useLocalSearchParams();
  const { theme } = useTheme();
  const { mutate: cancelCarwashBooking } = cancelCarwashBookingMutation();
  const parsedData: CarwashBookingData | null = data
    ? JSON.parse(Array.isArray(data) ? data[0] : data)
    : null;

  // State for cancellation
  const [isCancelling, setIsCancelling] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const cancelHandler = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this car wash booking? This action cannot be undone.',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            setIsCancelling(true);
            cancelCarwashBooking(
              { id },
              {
                onSuccess: (res) => {
                  setIsCancelling(false);
                  router.back();
                },
                onError: (error) => {
                  setIsCancelling(false);
                  showError('Oops!', 'Something went wrong. Please try again.');
                },
              }
            );
          },
        },
      ]
    );
  };

  if (!parsedData) {
    return (
      <Box style={{ backgroundColor: theme.backgroundPrimary, flex: 1 }}>
        <Header back title="Booking Details" />
        <Loading />
      </Box>
    );
  }

  const {
    booking_status,
    booking_time,
    cancellable,
    car_type,
    created_on,
    date,
    id,
    images,
    items,
    listing_name,
    payment_status,
    quantity,
    service_name,
    service_type_name,
    type,
    vehicle_number,
  } = parsedData;

  const canCancel = cancellable;

  return (
    <Box style={{ backgroundColor: theme.backgroundPrimary, flex: 1 }}>
      <Header back title="Booking Details" />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <CarwashTopCard
            id={id}
            image={images?.[0] || ''}
            name={listing_name}
            serviceType={service_type_name}
            quantity={quantity}
            vehicleNumber={vehicle_number}
            carType={car_type}
          />

          <TimeSlotCard bookingTime={booking_time} serviceDate={date} />

          {/* <BillingDetails
            items={items}
            total={undefined} // Add total if available in your data
          /> */}

          <StatusCard paymentStatus={payment_status} bookingStatus={booking_status} />

          {
            <Pressable
              style={{
                margin: 16,
                height: 44,
                backgroundColor: '#253D8F',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => Linking.openURL(`tel:${7272000555}`)}>
              <ThemedText color="white" variant="titleEmphasized">
                Support
              </ThemedText>
            </Pressable>
          }

          {canCancel && booking_status !== 'CANCELLED' && (
            <CancellationTerms
              onPressCancel={cancelHandler}
              isLoading={isCancelling}
              cancellable={cancellable}
            />
          )}

          {booking_status === 'CANCELLED' && (
            <CancelledOnCard canceledAt={created_on?.split('T')[0]} />
          )}

          {/* Additional info card */}
        </ScrollView>
      )}
    </Box>
  );
};

export default CarwashHistoryDetails;
