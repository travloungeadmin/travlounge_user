import { router, useFocusEffect } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, Linking, Platform, Pressable, ScrollView, StyleSheet } from 'react-native';

import BG from '@/assets/svgs/package_background.svg';
import PackageCard from '@/components/package-card';
import Icon from '@/components/ui/icon';
import { shadow } from '@/constants';
import { Box, Device, Image, Row, Text, useSafeAreaInsets } from '@/core';
import useUserStore, { logout } from '@/modules/user';
import { useActiveSubscriptionsQuery } from '@/services/query/home';
import { deleteAccountMutation, getProfileQuery } from '@/services/query/profile';
import { colors } from '@/theme';
import { ProfileScreenProps, ServiceItem, UserProfile } from '@/types/screens/profile/index.types';
import { Canvas, RadialGradient, Rect, vec } from '@shopify/react-native-skia';

const Profile: React.FC<ProfileScreenProps> = () => {
  const { data } = getProfileQuery();
  const { mutate, isSuccess } = deleteAccountMutation();
  const { bottomHeight } = useSafeAreaInsets();
  const { data: subscribedPackage, refetch } = useActiveSubscriptionsQuery();
  const { reset, setUserDetails, user } = useUserStore();

  useEffect(() => {
    if (isSuccess) {
      logout();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data?.user?.name !== user?.name) {
      setUserDetails({
        id: user?.id || '',
        mobile_number: user?.mobile_number,
        name: data?.user?.name,
      });
    }
  }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      if (subscribedPackage) {
        refetch();
      }
    }, [refetch])
  );

  const deleteHandler = () => {
    Alert.alert('Delete account', 'Are you sure you want to delete your account?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => mutate(),
      },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  const sendWhatsAppMessage = async () => {
    const message = 'Hello, I need help with my order';
    const phoneNumber = '+916235224422';
    const url =
      Platform.OS === 'android'
        ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
        : `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'WhatsApp is not installed on your device');
      }
    } catch (_error) {
      Alert.alert('Error', 'Failed to open WhatsApp');
    }
  };

  // Render profile header with user avatar, name and phone
  const renderProfileHeader = () => (
    <Row style={[styles.profileCard, shadow]}>
      <Image
        source={
          data?.user?.image
            ? { uri: data?.user?.image }
            : require('@/assets/images/empty_avatar.jpeg')
        }
        style={styles.avatar}
      />
      <Box style={styles.userInfo} gap={5}>
        <Text preset="POP_14_B" color="#333333">
          {data?.user?.name || 'New User'}
        </Text>
        <Text preset="POP_12_R" color="#333333">
          {data?.user?.phone}
        </Text>
      </Box>
      <Pressable
        onPress={() =>
          router.navigate({
            pathname: '/(root)/(main)/old/edit-profile',
            params: { type: 'edit' },
          })
        }
        style={styles.editButton}
        accessibilityRole="button"
        accessibilityLabel="Edit profile">
        <Icon size={20} name="EditProfile" />
      </Pressable>
    </Row>
  );

  // Render subscription info if available
  const renderSubscriptionInfo = () => {
    if (!subscribedPackage?.active_subscriptions?.length) {
      return null;
    }

    return (
      <Box style={{ marginBottom: -30 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Row style={{ paddingHorizontal: 20, gap: 20 }}>
            {subscribedPackage?.active_subscriptions?.map((activeSubscription) => (
              <Box
                style={[
                  styles.subscriptionCard,
                  shadow,
                  subscribedPackage?.active_subscriptions.length > 1
                    ? { width: Device.width * 0.75 }
                    : { width: Device.width - 40 },
                ]}>
                <Text color="#333333" preset="POP_16_SB">
                  Current Plan: {activeSubscription?.package_name}
                </Text>
                <Box style={styles.servicesContainer}>
                  {activeSubscription?.services?.map((item: ServiceItem, serviceIndex: number) => (
                    <Box key={`service-${serviceIndex}`} style={styles.serviceTag}>
                      <Text color="#333333" preset="POP_12_R">
                        {item?.type} {item?.remaining + '/' + item?.total}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Row>
        </ScrollView>
      </Box>
    );
  };

  // Render available plans
  const renderPlansSection = () => (
    <Box>
      <Text color="#333333" style={styles.sectionTitle} preset="POP_16_SB">
        Here are the plans for you
      </Text>
      <Row>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.plansScrollView}>
          <Row style={styles.packageList} gap={16}>
            {data?.curr_offers?.map((item: UserProfile['curr_offers'][number], index: number) => (
              <PackageCard
                key={`package-${index}`}
                onPress={() =>
                  router.navigate({
                    pathname: '/old/packge',
                    params: { packageDetails: JSON.stringify(item) },
                  })
                }
                name={item?.package_name}
                index={index}
                price={Number(item.amount || 0)}
                services={item?.display_description}
              />
            ))}
            {data?.curr_offers.length === 1 && (
              <Box
                style={[
                  {
                    marginVertical: 20,
                    marginBottom: 30,
                    alignItems: 'center',
                    backgroundColor: colors.cardBackgroundPrimary,
                    width: 205,
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    gap: 16,

                    justifyContent: 'center',
                    overflow: 'hidden',
                  },
                  shadow,
                ]}>
                <BG
                  width={400}
                  height={400}
                  style={{
                    zIndex: -1,
                    position: 'absolute',

                    alignSelf: 'center',
                  }}
                />
                <Canvas
                  style={{
                    width: 142,
                    height: 142,
                    zIndex: 0,
                    position: 'absolute',
                    alignSelf: 'center',
                  }}>
                  <Rect x={0} y={0} width={142} height={142}>
                    <RadialGradient
                      c={vec(71, 71)}
                      r={71}
                      colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
                    />
                  </Rect>
                </Canvas>
                <Icon size={50} name="Surprice" />
                <Text style={{ textAlign: 'center' }} preset="POP_12_M" color="#253D8F">
                  The Great{'\n'}Exciting Offers
                </Text>
                <Text preset="POP_18_SB" color="#253D8F">
                  Coming Soon
                </Text>
              </Box>
            )}
          </Row>
        </ScrollView>
      </Row>
    </Box>
  );

  // Render support card
  const renderSupportCard = () => (
    <Pressable
      onPress={sendWhatsAppMessage}
      style={[styles.supportCard, shadow]}
      accessibilityRole="button"
      accessibilityLabel="Contact support via WhatsApp">
      <Row gap={20}>
        <Box style={styles.supportInfoContainer}>
          <Text preset="POP_14_M" color="#333333">
            Help and support
          </Text>
          <Text preset="POP_12_R" color="#333333">
            Our virtual assistant is ready to swiftly resolve your service concerns. Click here to
            get started!
          </Text>
        </Box>
        <Icon name="Support" size={50} />
      </Row>
      <Box style={styles.chatButton}>
        <Text color="#fff" preset="POP_14_B">
          Chat with us
        </Text>
      </Box>
    </Pressable>
  );

  // Render footer with logout and delete options
  const renderFooterSection = () => (
    <Box>
      <Text style={styles.noticeText} preset="POP_12_R" color="#333333">
        Notice:
        {'\n'}Delete will permanently remove your data. {'\n'}Log Out keeps your data safe and
        accessible after login.{' '}
      </Text>
      <Box style={styles.divider} />
      <Row style={styles.buttonRow}>
        <Pressable
          onPress={deleteHandler}
          style={styles.footerButton}
          accessibilityRole="button"
          accessibilityLabel="Delete account">
          <Icon name="DeleteProfile" />
          <Text preset="POP_16_M" color="#253D8F">
            Delete
          </Text>
        </Pressable>
        <Pressable
          onPress={handleLogout}
          style={styles.footerButton}
          accessibilityRole="button"
          accessibilityLabel="Log out">
          <Icon name="Logout" />
          <Text preset="POP_16_M" color="#253D8F">
            Logout
          </Text>
        </Pressable>
      </Row>
    </Box>
  );

  return (
    <ScrollView style={styles.container}>
      <Box style={[styles.contentContainer, { paddingBottom: bottomHeight || 20 }]}>
        {renderProfileHeader()}
        {renderSubscriptionInfo()}
        {data?.curr_offers?.length > 0 ? renderPlansSection() : null}
        {renderSupportCard()}
        {renderFooterSection()}
      </Box>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundPrimary,
  },
  contentContainer: {
    gap: 30,
    paddingTop: 16,
  },
  profileCard: {
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 10,
    padding: 20,
    gap: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
  },
  editButton: {
    backgroundColor: '#253D8F',
    height: 34,
    width: 34,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscriptionCard: {
    // margin: 20,
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
    marginBottom: 30,
  },
  serviceTag: {
    backgroundColor: '#E5EAF0',
    borderRadius: 26,
    height: 26,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  servicesContainer: {
    flexDirection: 'row',
    gap: 10,
    display: 'flex',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    marginLeft: 20,
  },
  plansScrollView: {
    marginBottom: -30,
  },
  packageList: {
    paddingHorizontal: 20,
  },
  supportCard: {
    marginHorizontal: 20,
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 10,
    padding: 20,
    gap: 15,
  },
  supportInfoContainer: {
    flex: 1,
    gap: 10,
  },
  chatButton: {
    height: 32,
    backgroundColor: '#253D8F',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeText: {
    alignSelf: 'center',
    width: Device.width - 80,
  },
  divider: {
    alignSelf: 'center',
    height: 1,
    backgroundColor: 'rgba(37, 61, 143, 0.2)',
    width: Device.width - 80,
    marginVertical: 20,
  },
  buttonRow: {
    alignSelf: 'center',
    width: Device.width - 140,
    justifyContent: 'space-between',
  },
  footerButton: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
