import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text as RNText, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Logo from '@/assets/svgs/headerLogo.svg';
import RightDrawer from '@/components/common/RightDrawer';
import { useSafeAreaInsets } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import useUserStore from '@/modules/user';
import { ThemedText } from './common/ThemedText';

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
  const { theme } = useTheme();

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
      icon: <FontAwesome name="user" size={20} color={theme.gray600} />,
      onPress: () => router.navigate('/profile'),
      pathName: '/profile',
    },
    {
      id: 'bookings',
      title: 'My Bookings',
      icon: <Entypo name="book" size={20} color={theme.gray600} />,
      onPress: () => router.navigate('/booking-history'),
    },
    {
      id: 'wallet',
      title: 'Wallet',
      icon: <FontAwesome5 name="wallet" size={20} color={theme.gray600} />,
      onPress: () => router.navigate('/old/wallet'),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Entypo name="cog" size={20} color={theme.gray600} />,
      onPress: () => console.log('Settings pressed'), // Update with actual route when available
      separator: true,
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <Entypo name="help-with-circle" size={20} color={theme.gray600} />,
      onPress: () => console.log('Help pressed'), // Update with actual route when available
    },
    {
      id: 'about',
      title: 'About',
      icon: <Entypo name="info-with-circle" size={20} color={theme.gray600} />,
      onPress: () => console.log('About pressed'), // Update with actual route when available
    },
  ];

  return (
    <View style={[styles.safeAreaView, { backgroundColor: theme.backgroundPrimary }, style]}>
      <View style={[styles.headerContainer, { marginTop: topHeight }]}>
        <View style={[styles.row, { flex: 1 }]}>
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
              <FontAwesome name="chevron-left" size={20} color={theme.primary} />
            </Pressable>
          )}
          {title && (
            <ThemedText
              ellipsizeMode="tail"
              style={{ flex: 1 }}
              numberOfLines={1}
              color="gray900"
              variant="title">
              {title}
            </ThemedText>
          )}
        </View>

        <View style={[styles.row]}>
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
              <View>
                <Entypo name="location-pin" size={20} color={theme.gray600} />
                {!place && (
                  <View style={styles.locationBadge}>
                    <RNText style={styles.locationBadgeText}>x</RNText>
                  </View>
                )}
              </View>
              <ThemedText variant="label" color="gray600">
                {!!place ? place : 'Enable location'}
              </ThemedText>
            </Pressable>
          )}

          {/* {profileIcon && (
            <Pressable onPress={() => router.navigate('/profile')}>
              <Icon name="User" fill={theme.gray600} size={24} />
            </Pressable>
          )} */}
          {wallet && (
            <Pressable onPress={handleWallet}>
              <FontAwesome5 name="wallet" size={24} color={theme.gray600} />
            </Pressable>
          )}

          <Pressable style={{ paddingHorizontal: 5 }} onPress={handleMenuPress}>
            <Entypo name="dots-three-vertical" size={24} color={theme.gray600} />
          </Pressable>
          {/* {booking && (
            <Pressable onPress={handleBooking}>
              <Icon name="Bookings" fill={theme.gray600} size={24} />
            </Pressable>
          )} */}
        </View>
      </View>

      {/* Right Drawer Modal */}
      <RightDrawer visible={isDrawerVisible} onClose={handleCloseDrawer} items={drawerItems} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeAreaView: {
    zIndex: 1000,
    // backgroundColor set via inline style for theme
  },
  headerContainer: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
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
