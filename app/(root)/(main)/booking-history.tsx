import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/common/ThemedText';
import Icon from '@/components/ui/icon';
import { shadow } from '@/constants';
import { Box, Device, Image, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import useUserStore from '@/modules/user';
import Loading from '@/old/components/common/Loading';
import { getBookings } from '@/services/query/booking';

type BookingItemProps = {
  item: any; // TODO: Add proper type
  getStatus: (status: string, subStatus: string) => string;
  getStatusColor: (status: string, subStatus: string) => string;
  iconName: (serviceName: string) => 'Toloo' | 'CarWash' | 'Cafe';
};

const BookingItem = ({ item, getStatus, getStatusColor, iconName }: BookingItemProps) => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={() => {
        if (item?.service_name === 'car_wash') {
          router.navigate({
            pathname: '/carwash-history-details',
            params: {
              data: JSON.stringify(item),
            },
          });
          return;
        }
        if (item?.service_name === 'sleeping_pod') {
          router.navigate({
            pathname: '/booked-details',
            params: {
              id: item.id,
            },
          });
          return;
        }
        setModalVisible(true);
      }}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.backgroundCard,
          marginHorizontal: 16,
          padding: 10,
          borderRadius: 8,
        },
        shadow,
      ]}>
      <Row style={{ flex: 1 }} gap={10}>
        {item?.images?.length > 0 ? (
          <Image
            contentFit="cover"
            source={{
              uri: item?.images[0],
            }}
            style={{ width: 41, height: 41, borderRadius: 3 }}
          />
        ) : (
          <View
            style={{
              width: 41,
              height: 41,
              borderRadius: 3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name={iconName(item?.service_name)} size={30} />
          </View>
        )}
        <Box style={{ justifyContent: 'space-evenly' }}>
          <ThemedText color="gray900" variant="bodyEmphasized">
            {item?.no_of_pods ? `${item.no_of_pods} ` : ''}
            {item?.menu_item_name || item?.service_type_name}
          </ThemedText>
          <ThemedText color="gray600" variant="bodySmall">
            {item?.date}
          </ThemedText>
        </Box>
      </Row>
      {item?.payment_status === 'PENDING' ? (
        <Box
          style={{
            height: 30,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#253D8F',
            borderRadius: 20,
          }}>
          <ThemedText variant="bodySmallEmphasized" style={{ textAlign: 'right' }} color="white">
            Pay Now
          </ThemedText>
        </Box>
      ) : (
        <ThemedText
          variant="bodySmallEmphasized"
          style={{
            textAlign: 'right',
            color:
              item?.service_name === 'sleeping_pod' || item?.service_name === 'car_wash'
                ? getStatusColor(item?.payment_status, item?.booking_status)
                : '#138832',
          }}>
          {item?.service_name === 'sleeping_pod' || item?.service_name === 'car_wash'
            ? getStatus(item?.payment_status, item?.booking_status)
            : 'Redeemed'}
        </ThemedText>
      )}
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <Box
            style={{
              width: Device.width * 0.9,
              backgroundColor: '#fff',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{
                height: 40,
                width: 40,
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#253D8F',
                zIndex: 1,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons name="close" size={30} color="#FFC727" />
            </Pressable>
            {item?.images?.[0] && (
              <Image
                source={{ uri: item?.images[0] }}
                contentFit="cover"
                style={{
                  width: Device.width * 0.9,
                  height: Device.width * 0.46,
                }}
              />
            )}
            <Box style={{ padding: 20, marginTop: item?.images?.[0] ? 0 : 40 }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <ThemedText color="gray900" variant="bodySmallEmphasized">
                  {item?.quantity > 1 ? `${item?.quantity} ` : ''}
                  {item?.menu_item_name || item?.service_type_name}
                </ThemedText>
                <ThemedText color="primary" variant="bodySmallEmphasized">
                  {item?.service_name === 'car_wash' ? 'Booked' : 'Redeemed'}
                </ThemedText>
              </Row>
              <ThemedText style={{ marginTop: 5 }} color="gray600" variant="bodySmall">
                {item?.date}
              </ThemedText>
              <ThemedText style={{ marginTop: 20 }} color="gray900" variant="body">
                {item?.listing_name}
              </ThemedText>
            </Box>
          </Box>
        </View>
      </Modal>
    </Pressable>
  );
};

const BookingHistory = () => {
  const { user } = useUserStore();
  const { theme } = useTheme();
  const { data, isLoading, refetch, hasNextPage, isFetchingNextPage, fetchNextPage } =
    getBookings();

  const getStatus = (status: string, subStatus: string) => {
    console.log(status, subStatus);
    switch (status) {
      case 'FAILED':
        return 'Failed';
      case 'PAID':
        if (subStatus === 'CANCELLED') {
          return 'Cancelled';
        }
        return 'Redeemed';
      case 'NOT PAID':
        if (subStatus === 'CANCELLED') {
          return 'Cancelled';
        }
        return `Booking${'\n'}Confirmed`;

      case 'CONFIRMED':
        if (subStatus === 'CANCELLED') {
          return 'Cancelled';
        }
        return `Booking${'\n'}Confirmed`;
      case 'PENDING':
        return 'Pending';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string, subStatus: string) => {
    switch (status) {
      case 'FAILED':
        return '#881313';
      case 'PAID':
        if (subStatus === 'CANCELLED') {
          return '#881313';
        }
        return '#138832';
      case 'NOT PAID':
        if (subStatus === 'CANCELLED') {
          return '#881313';
        }

      case 'CONFIRMED':
        if (subStatus === 'CANCELLED') {
          return '#881313';
        }
        return '#253D8F';
      case 'PENDING':
        return '#3C3C3C';
      case 'CANCELLED':
        return '#881313';
      default:
        return '#138832';
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  if (isLoading) {
    return <Loading />;
  }

  const iconName = (serviceName: string) => {
    switch (serviceName) {
      case 'toloo':
        return 'Toloo' as const;
      case 'car_wash':
        return 'CarWash' as const;
      case 'bean_wagon':
        return 'Cafe' as const;
      default:
        return 'Toloo' as const;
    }
  };

  return (
    <Box style={{ backgroundColor: theme.backgroundPrimary, flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingVertical: 20 }}
        data={data}
        ItemSeparatorComponent={() => <Box style={{ height: 20 }} />}
        ListEmptyComponent={
          <Box
            style={{
              flex: 1,

              alignItems: 'center',
              justifyContent: 'center',
              marginTop: Device.height / 3,
            }}>
            <Image
              contentFit="contain"
              source={require('@/assets/images/not-found.png')}
              style={styles.notFoundImage}
            />
            <ThemedText style={{ textAlign: 'center', width: Device.width * 0.7 }} variant="body">
              No active bookings found. Please confirm your reservation.
            </ThemedText>
          </Box>
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookingItem
            item={item}
            getStatus={getStatus}
            getStatusColor={getStatusColor}
            iconName={iconName}
          />
        )}
        onEndReached={
          hasNextPage && !isFetchingNextPage
            ? () => {
                fetchNextPage();
              }
            : undefined
        }
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasNextPage && isFetchingNextPage ? (
            <Box style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="large" color="#253D8F" style={{ paddingVertical: 20 }} />
            </Box>
          ) : null
        }
      />
    </Box>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({
  notFoundImage: {
    width: Device.width / 3,
    height: Device.width / 3,
  },
});
