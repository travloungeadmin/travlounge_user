import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, ScrollView } from 'react-native';

import Header from '@/components/header';
import { shadow } from '@/constants';
import { Box, Image, Row, Text } from '@/core';
import { showError } from '@/lib/toast';
import Loading from '@/old/components/common/Loading';
import { cancelCarwashBookingMutation } from '@/services/query/booking';
import { colors } from '@/theme';
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
  return (
    <Box
      style={[
        {
          margin: 16,
          borderRadius: 8,
          backgroundColor: colors.cardBackgroundPrimary,
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
          <Text preset="POP_16_SB" color="#253D8F">
            {name}
          </Text>
          <Text preset="POP_14_R" color="#333333">
            Service: {serviceType}
          </Text>
          {/* <Text preset="POP_14_R" color="#333333">
            Date: {date} • {bookingTime}
          </Text> */}
          <Text preset="POP_14_R" color="#333333">
            Booking ID: #{id}
          </Text>
        </Box>
      </Row>
      <Box style={{ backgroundColor: '#F8F9FA', padding: 12, borderRadius: 8, gap: 8 }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Text preset="POP_12_SB" color="#666666">
            Vehicle Number:
          </Text>
          <Text preset="POP_12_SB" color="#333333">
            {vehicleNumber}
          </Text>
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          <Text preset="POP_12_SB" color="#666666">
            Car Type:
          </Text>
          <Text preset="POP_12_SB" color="#333333">
            {carType}
          </Text>
        </Row>
      </Box>
    </Box>
  );
};

const BillingDetails: React.FC<BillingDetailsProps> = ({ items, total }) => {
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
        {items && items.length > 0 ? (
          items.map((item: any, index: number) => (
            <Row key={index} style={{ justifyContent: 'space-between' }}>
              <Text preset="POP_14_R" color="#333333">
                {item.type}
              </Text>
              <Text preset="POP_14_R" color="#333333">
                {item.rate} X {item.quantity} = {item.rate * item.quantity}
              </Text>
            </Row>
          ))
        ) : (
          <Text preset="POP_14_R" color="#333333">
            Service charges as per booking
          </Text>
        )}
      </Box>

      {total && (
        <>
          <Box
            style={{ height: 1, backgroundColor: 'rgba(37, 61, 143, 0.3)', marginVertical: 8 }}
          />
          <Row style={{ justifyContent: 'space-between' }}>
            <Text preset="POP_14_SB" color="#333333">
              Total
            </Text>
            <Text preset="POP_14_SB" color="#333333">
              ₹{total}
            </Text>
          </Row>
        </>
      )}
    </Box>
  );
};

const StatusCard: React.FC<StatusCardProps> = ({ paymentStatus, bookingStatus }) => {
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
          backgroundColor: colors.cardBackgroundPrimary,
          padding: 16,
          gap: 12,
        },
        shadow,
      ]}>
      <Text preset="POP_14_SB" color="#333333">
        Status Information
      </Text>

      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text preset="POP_14_R" color="#333333">
          Payment Status
        </Text>
        <Box
          style={{
            backgroundColor: getStatusColor(paymentStatus),
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
          }}>
          <Text preset="POP_12_SB" color="#FFFFFF">
            {paymentStatus || 'N/A'}
          </Text>
        </Box>
      </Row>

      {bookingStatus && (
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text preset="POP_14_R" color="#333333">
            Booking Status
          </Text>
          <Box
            style={{
              backgroundColor: getStatusColor(bookingStatus),
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
            }}>
            <Text preset="POP_12_SB" color="#FFFFFF">
              {bookingStatus}
            </Text>
          </Box>
        </Row>
      )}
    </Box>
  );
};

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({ bookingTime, serviceDate }) => {
  return (
    <Box
      style={[
        {
          margin: 16,
          borderRadius: 8,
          backgroundColor: colors.cardBackgroundPrimary,
          padding: 16,
          gap: 12,
        },
        shadow,
      ]}>
      <Text preset="POP_14_SB" color="#333333">
        Scheduled Time
      </Text>

      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text preset="POP_14_R" color="#666666">
          Service Date
        </Text>
        <Text preset="POP_14_SB" color="#333333">
          {serviceDate}
        </Text>
      </Row>

      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text preset="POP_14_R" color="#666666">
          Time Slot
        </Text>
        <Box
          style={{
            backgroundColor: '#E8F4FD',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#253D8F',
          }}>
          <Text preset="POP_12_SB" color="#253D8F">
            {bookingTime}
          </Text>
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
        {cancellable
          ? 'You can cancel your car wash booking up to 2 hours before the scheduled time. After that, the booking is non-refundable.'
          : 'This booking cannot be cancelled at this time.'}
      </Text>
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
            <Text color="#fff" preset="POP_14_M">
              Cancel Booking
            </Text>
          )}
        </Pressable>
      )}
    </Box>
  );
};

const CancelledOnCard: React.FC<CancelledOnCardProps> = ({ canceledAt }) => {
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

const CarwashHistoryDetails = () => {
  const { data } = useLocalSearchParams();
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
      <Box style={{ backgroundColor: colors.backgroundPrimary, flex: 1 }}>
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
    <Box style={{ backgroundColor: colors.backgroundPrimary, flex: 1 }}>
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
              <Text color="#fff" preset="POP_16_SB">
                Support
              </Text>
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
