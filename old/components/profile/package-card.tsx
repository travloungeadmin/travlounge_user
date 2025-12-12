import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import { Box, Row, Text } from '@/core';
import { showError, showSuccess } from '@/lib/toast';
import useUserStore from '@/modules/user';
import { constants, shadow } from '@/old/constants';
import queryClient from '@/services/query';
import { subscribeMutation, verifySubscribeMutation } from '@/services/query/profile';
import QUERIES_KEY from '@/services/query/query-keys';
const RAZORPAY_KEY_ID = 'rzp_test_1DP5mmOlF5G5ag';

const screenWidth = Dimensions.get('window').width;

const PackageCard = ({ item }) => {
  const { mutate, isPending } = subscribeMutation();
  const { mutate: verifyMutation } = verifySubscribeMutation();
  const { user } = useUserStore();

  const handleRazorpay = async (id, subscription_id) => {
    const options = {
      // description: "Credits towards consultation",
      // image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: 'INR',
      key: process.env.EXPO_PUBLIC_RAZOR_PAY_KEY_ID,
      amount: item.amount * 100,
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
        verifyMutation({
          razorpay_order_id: data.razorpay_order_id,
          razorpay_payment_id: data.razorpay_payment_id,
          razorpay_signature: data.razorpay_signature,
          subscription_id,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERIES_KEY.PACKAGES_LIST],
        });
        showSuccess('Success', 'Payment Successful, Thank You!');
      })
      .catch((error) => {
        showError('error', 'payment failed');
      });
  };

  const handleBuy = () => {
    const data = { package: item.id };
    mutate(data, {
      onSuccess: (data) => {
        if (!data?.is_profile_completed) {
          Alert.alert(
            'Profile Incomplete',
            'Please complete your profile before proceeding to payment.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
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
        } else if (data?.order_id?.includes('TRV')) {
          showSuccess('Success', 'Welcome bonus applied successfully');
          queryClient.invalidateQueries({
            queryKey: [QUERIES_KEY.PACKAGES_LIST],
          });
          router.back();
          return;
        } else {
          handleRazorpay(data?.order_id, data?.subscription_id);
        }
      },
      onError: (err) => {
        if (err?.response?.data?.detail) {
          showError('Error', err?.response?.data?.detail);
          return;
        }
        showError(
          'Error',
          err?.response?.data?.message || 'Something went wrong, please try again later'
        );
      },
    });
  };
  return (
    <Box style={[{ backgroundColor: '#fff', padding: 16, borderRadius: 8 }, shadow]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text
          style={{
            color: '#00205B',
            fontFamily: constants.fontPopM,
            fontSize: 18,
            flex: 1,
          }}>
          {item?.package_name}
        </Text>
        <Text
          style={{
            color: '#00205B',
            fontFamily: constants.fontPopR,
            fontSize: 14,
            textAlign: 'right',
          }}>
          {`  ${item?.months} Month validity`}
        </Text>
      </View>
      <Row style={{ gap: 10, flex: 1, display: 'flex', flexWrap: 'wrap' }}>
        {item?.display_description?.map((serv, index) => (
          <Box
            style={{
              backgroundColor: '#E1E7F9',
              borderRadius: 12,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text preset="POP_13_R">
              {serv?.number} {serv?.name}
            </Text>
          </Box>
        ))}
      </Row>
      {Math.ceil(item?.amount) === 0 && (
        <Text color="#666666" style={{ paddingVertical: 12 }} preset="POP_12_R">
          *{item?.package_name} redeemed only in Travlounge stores
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
          marginTop: Math.ceil(item?.amount) === 0 ? 0 : 40,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text
            style={{
              color: '#00205B',
              fontFamily: constants.fontRobB,
              fontSize: 20,
            }}>
            ₹ {Number(item?.amount).toFixed(0)}
          </Text>
          <Text
            style={{
              color: '#888',
              fontFamily: constants.fontPopR,
              fontSize: 11,
              marginBottom: 2,
            }}>
            + GST
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleBuy}
          style={{
            borderRadius: 15,
            backgroundColor: '#253D8F',
            height: 30,
            width: 109,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isPending ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text preset="POP_14_M" color="#fff">
              Subscribe
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Box>
  );
};

export default PackageCard;

const styles = StyleSheet.create({});
