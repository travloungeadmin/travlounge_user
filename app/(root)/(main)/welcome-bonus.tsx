import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import WelcomeBG from '@/assets/svgs/welcome-bonus.svg';
import { Device, Image, Text, useSafeAreaInsets } from '@/core';
import { showError, showSuccess } from '@/lib/toast';
import useUserStore from '@/modules/user';
import queryClient from '@/services/query';
import { getPackagesListQuery } from '@/services/query/home';
import { subscribeMutation, verifySubscribeMutation } from '@/services/query/profile';
import QUERIES_KEY from '@/services/query/query-keys';

interface PackageOffer {
  number: number;
  name: string;
}

interface Package {
  id: string;
  amount: string;
  display_description: PackageOffer[];
}

interface SubscribeResponse {
  order_id: string;
  is_profile_completed: boolean;
}

const WelcomeBonus: React.FC = () => {
  const { topHeight } = useSafeAreaInsets();
  const { data: packages, isLoading } = getPackagesListQuery();
  const { mutate: subscribe, isPending } = subscribeMutation();
  const { user, setLoginFistTime } = useUserStore();
  const { mutate: verifyMutation } = verifySubscribeMutation();

  React.useEffect(() => {
    setLoginFistTime(false);
  }, [setLoginFistTime]);

  const handleRazorpay = async (orderId: string, amount: number, subscription_id: number) => {
    const options = {
      currency: 'INR',
      key: process.env.EXPO_PUBLIC_RAZOR_PAY_KEY_ID,
      amount: amount * 100,
      name: 'Travlounge',
      order_id: orderId,
      prefill: {
        contact: user?.mobile_number,
        name: user?.name,
      },
    };

    await RazorpayCheckout.open(options)
      .then((data) => {
        verifyMutation({
          razorpay_order_id: data.razorpay_order_id,
          razorpay_payment_id: data.razorpay_payment_id,
          razorpay_signature: data.razorpay_signature,
          subscription_id,
        });
        showSuccess('Success', 'Payment Successful, Thank You!');
        queryClient.invalidateQueries({
          queryKey: [QUERIES_KEY.PACKAGES_LIST],
        });
        router.back();
      })
      .catch((error) => {
        showError('error', 'Payment failed');
      });
  };

  const handleBuy = (id: string, amount: number) => {
    const data = { package: id };

    subscribe(data, {
      onSuccess: (data: SubscribeResponse) => {
        if (!data?.is_profile_completed) {
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
        } else if (data?.order_id?.includes('TRV')) {
          queryClient.invalidateQueries({
            queryKey: [QUERIES_KEY.PACKAGES_LIST],
          });
          showSuccess('Success', 'Welcome bonus applied successfully');
          router.back();
          return;
        } else {
          handleRazorpay(data.order_id, amount, data?.subscription_id);
        }
      },
      onError: (err: any) => {
        showError('error', err?.response?.data?.message);
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WelcomeBG
        width={Device.width + 100}
        height={Device.height + 100}
        style={styles.backgroundImage}
      />
      <Pressable
        onPress={() => router.back()}
        style={[styles.closeButton, { top: topHeight + 20 }]}>
        <Ionicons name="close" size={24} color="white" />
      </Pressable>

      <Text color="#fff" style={styles.headerText} preset="POP_24_SB">
        Great Offers{'\n'}For You
      </Text>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={packages}
          horizontal
          renderItem={({ item }: { item: Package }) => (
            <View style={styles.packageCard}>
              <Image
                source={require('@/assets/images/welcome_toloo.png')}
                style={styles.packageImage}
              />
              {parseInt(item?.amount) === 0 && (
                <>
                  <Text color="#000" style={styles.welcomeText} preset="POP_18_SB">
                    The great welcome bonus to you ...
                  </Text>
                  <Text color="#666666" style={styles.freeOfferText} preset="POP_12_R">
                    *{item?.package_name} redeemed only in Travlounge stores
                  </Text>
                </>
              )}
              <View style={styles.offersContainer}>
                {item?.display_description?.map((offer: PackageOffer) => (
                  <View key={`${item.id}-${offer.name}`} style={styles.offerTag}>
                    <Text color="#333333" preset="POP_12_R">
                      {offer.number} {offer.name}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.spacer} />
              <Text style={styles.amountText} color="#333333" preset="POP_18_SB">
                ₹ {item?.amount}
              </Text>

              <Pressable
                style={styles.actionButton}
                onPress={() => handleBuy(item?.id, parseInt(item?.amount))}>
                <Text style={styles.actionButtonText} preset="POP_16_SB">
                  {parseInt(item?.amount) === 0 ? 'Claim Now' : 'Buy Now'}
                </Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#253D8F',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#253D8F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.2,
    position: 'absolute',
    zIndex: -1,
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    zIndex: 1,

    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    borderRadius: 20,
    height: 34,
    width: 34,
  },
  headerText: {
    textAlign: 'center',
  },
  packageCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 16,
    width: Device.width * 0.7,
  },
  packageImage: {
    width: Device.width * 0.7 - 32,
    height: Device.width * 0.7 - 32,
    borderRadius: 10,
  },
  welcomeText: {
    marginTop: 10,
  },
  freeOfferText: {
    marginTop: 5,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 10,
    opacity: 0.8,
    lineHeight: 14,
  },
  offersContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
    flexWrap: 'wrap',
  },
  offerTag: {
    borderRadius: 26,
    backgroundColor: '#E5EAF0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
    paddingHorizontal: 10,
  },
  spacer: {
    flex: 1,
  },
  amountText: {
    marginTop: 20,
    marginBottom: 10,
  },
  actionButton: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  actionButtonText: {
    backgroundColor: '#253D8F',
    paddingVertical: 10,
    textAlign: 'center',
    borderRadius: 50,
    color: '#fff',
  },
});

export default WelcomeBonus;
