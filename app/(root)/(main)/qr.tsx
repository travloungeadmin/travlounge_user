import { useFocusEffect } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

// import {
//   CustomHeader,
//   HowToScanCard,
//   Loading,
//   QRContainer,
// } from "../../components";
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

import { getServiceListQuery, getWalletDetails } from '@//services/query/qr';
import SubscriptionView from '@/components/dashboard/subscription-view';
import { shadow } from '@/constants';
import { Box, Device, Row, Text } from '@/core';
import useUserStore from '@/modules/user';
import Loading from '@/old/components/common/Loading';
import LocationPermissionView from '@/old/components/common/location-permission-view';
import queryClient from '@/services/query';
import QUERIES_KEY from '@/services/query/query-keys';
import { colors } from '@/theme';

const SubscribedCard = ({ subscription_data }) => {
  const list = subscription_data?.flatMap((item) => item?.service_type_counts);

  return (
    <Box gap={10} style={{ marginHorizontal: 40, marginTop: 20 }}>
      <Text preset="POP_16_SB" color="#333333">
        Subscription Details
      </Text>
      <Box gap={5}>
        {list?.map((item) => (
          <Row
            style={{
              justifyContent: 'space-between',
              gap: 20,
              flex: 1,
              alignItems: 'center',
            }}>
            <Text style={{ flex: 1 }} preset="POP_14_R" color="#333333">
              {item?.service}
            </Text>
            <Text preset="POP_14_R" color="#333333">
              {item?.remaining}
            </Text>
          </Row>
        ))}
      </Box>
    </Box>
  );
};

const QR = () => {
  const { data, isFetching } = getServiceListQuery();
  const { user } = useUserStore();
  const { data: qrWalletData, isLoading, refetch } = getWalletDetails();
  const { isLocationPermissionGranted } = useUserStore();
  const viewShot = React.useRef<ViewShot>(null);

  const packages = queryClient.getQueryData([QUERIES_KEY.PACKAGES_LIST]);

  const captureAndShareScreenshot = () => {
    viewShot.current.capture().then((uri) => {
      Sharing.shareAsync('file://' + uri);
    }),
      (error) => console.error('Oops, snapshot failed', error);
  };
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  if (isLoading) return <Loading />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
      }}>
      <ScrollView>
        <Box>
          <ViewShot ref={viewShot} options={{ format: 'jpg', quality: 0.9 }}>
            <View
              style={[
                {
                  marginTop: 20,
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  padding: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  gap: 30,
                },
                shadow,
              ]}>
              <QRCode
                value={user?.id?.toString()}
                size={Device.width - 150}
                backgroundColor="#fff"
              />
              <Text preset="POP_16_SB" color="#333333">
                {user?.name || user?.mobile_number}
              </Text>
            </View>
          </ViewShot>
          <Row
            style={{
              justifyContent: 'space-between',
              marginHorizontal: 40,
              marginTop: 50,
              paddingBottom: 30,
              borderBottomWidth: 1,
              borderColor: 'rgba(37, 61, 143, 0.3)',
            }}>
            <Text preset="POP_16_SB" color="#333333">
              Wallet Balance
            </Text>
            <Text preset="POP_16_SB" color="#333333">
              {qrWalletData.wallet_balance}
            </Text>
          </Row>
          {qrWalletData.packages.length > 0 && (
            <SubscribedCard subscription_data={qrWalletData.subscription_data} />
          )}
          {qrWalletData.packages.length === 0 && (
            <Box gap={20} style={{ marginTop: 20 }}>
              <Box style={{ marginHorizontal: 40 }}>
                <Text preset="POP_16_SB" color="#333333">
                  You don't have subscription
                </Text>
                <Text style={{ lineHeight: 24 }} preset="POP_14_R" color="#333333">
                  Here are some of the best offer for you.{' '}
                </Text>
              </Box>
              <SubscriptionView packages={packages} />
            </Box>
          )}
        </Box>
        <Pressable
          onPress={captureAndShareScreenshot}
          style={{
            backgroundColor: '#FFFFFF',
            height: 44,
            borderRadius: 22,
            marginHorizontal: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Text preset="POP_16_SB" color="#253D8F">
            Share QR Code
          </Text>
        </Pressable>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 40,
          }}
          preset="POP_14_R"
          color="#333333">
          Note: The QR code is valid for only{' '}
          <Text preset="POP_14_SB" color="#333333">
            30 minutes.
          </Text>
        </Text>
      </ScrollView>
      {!isLocationPermissionGranted && <LocationPermissionView />}
    </View>
  );
};

export default QR;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
