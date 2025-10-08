import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text as RNText, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import Logo from '@/assets/svgs/headerLogo.svg';
import RightDrawer from '@/components/common/RightDrawer';
import { Box, Row, Text, useSafeAreaInsets } from '@/core';
import useUserStore from '@/modules/user';
import { colors } from '@/theme';

type Props = {
  logo?: boolean;
  location?: boolean;
  title?: string;
  back?: boolean;
  profileIcon?: boolean;
  wallet?: boolean;
  style?: StyleProp<ViewStyle>;
  booking?: boolean;
};

const Header = ({ logo, location, title, back, profileIcon, wallet, style, booking }: Props) => {
  const { place, setSession } = useUserStore((state) => state);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const { topHeight } = useSafeAreaInsets();

  const handleBack = () => {
    router.back();
  };

  const handleWallet = () => {
    router.navigate('/old/wallet');
  };
  const handleBooking = () => {
    router.navigate('/booking-history');
  };

  const handleMenuPress = () => {
    setIsDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  // Custom drawer items with navigation actions
  const drawerItems = [
    {
      id: 'profile',
      title: 'Profile',
      icon: <FontAwesome name="user" size={20} color={colors.iconSecondary} />,
      onPress: () => router.navigate('/profile'),
      pathName: '/profile',
    },
    {
      id: 'bookings',
      title: 'My Bookings',
      icon: <Entypo name="book" size={20} color={colors.iconSecondary} />,
      onPress: () => router.navigate('/booking-history'),
    },
    {
      id: 'wallet',
      title: 'Wallet',
      icon: <FontAwesome5 name="wallet" size={20} color={colors.iconSecondary} />,
      onPress: () => router.navigate('/old/wallet'),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Entypo name="cog" size={20} color={colors.iconSecondary} />,
      onPress: () => console.log('Settings pressed'), // Update with actual route when available
      separator: true,
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <Entypo name="help-with-circle" size={20} color={colors.iconSecondary} />,
      onPress: () => console.log('Help pressed'), // Update with actual route when available
    },
    {
      id: 'about',
      title: 'About',
      icon: <Entypo name="info-with-circle" size={20} color={colors.iconSecondary} />,
      onPress: () => console.log('About pressed'), // Update with actual route when available
    },
  ];

  return (
    <Box style={[styles.safeAreaView, style]}>
      <Box style={[styles.headerContainer, { marginTop: topHeight }]}>
        <Row style={[styles.row, { flex: 1 }]}>
          {logo && <Logo height={40} />}
          {back && (
            <Pressable
              style={{
                alignSelf: 'center',
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleBack}>
              <FontAwesome name="chevron-left" size={20} color={colors.iconPrimary} />
            </Pressable>
          )}
          {title && (
            <Text
              ellipsizeMode="tail"
              style={{ flex: 1 }}
              numberOfLines={1}
              color={colors.textPrimary}
              preset="POP_18_M">
              {title}
            </Text>
          )}
        </Row>

        <Row style={[styles.row]}>
          {location && (
            <Pressable
              onPress={() =>
                router.navigate({
                  pathname: '/search',
                  params: {
                    isHeader: 'true',
                  },
                })
              }
              style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Box>
                <Entypo name="location-pin" size={20} color={colors.iconSecondary} />
                {!place && (
                  <Box style={styles.locationBadge}>
                    <RNText style={styles.locationBadgeText}>x</RNText>
                  </Box>
                )}
              </Box>
              <Text preset="POP_12_R" color={colors.textSecondary}>
                {!!place ? place : 'Enable location'}
              </Text>
            </Pressable>
          )}

          {/* {profileIcon && (
            <Pressable onPress={() => router.navigate('/profile')}>
              <Icon name="User" fill={colors.iconSecondary} size={24} />
            </Pressable>
          )} */}
          {wallet && (
            <Pressable onPress={handleWallet}>
              <FontAwesome5 name="wallet" size={24} color={colors.iconSecondary} />
            </Pressable>
          )}

          <Pressable style={{ paddingHorizontal: 5 }} onPress={handleMenuPress}>
            <Entypo name="dots-three-vertical" size={24} color={colors.iconSecondary} />
          </Pressable>
          {/* {booking && (
            <Pressable onPress={handleBooking}>
              <Icon name="Bookings" fill={colors.iconSecondary} size={24} />
            </Pressable>
          )} */}
        </Row>
      </Box>

      {/* Right Drawer Modal */}
      <RightDrawer visible={isDrawerVisible} onClose={handleCloseDrawer} items={drawerItems} />
    </Box>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeAreaView: {
    zIndex: 1000,
    backgroundColor: colors.backgroundPrimary,
  },
  headerContainer: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  row: {
    alignItems: 'center',
    gap: 10,
  },
  locationBadge: {
    backgroundColor: 'rgba(255, 204, 2, 1)',
    height: 12,
    width: 12,
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationBadgeText: {
    fontSize: 10,
    color: 'rgba(37, 61, 143, 1)',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'none',
  },
});
