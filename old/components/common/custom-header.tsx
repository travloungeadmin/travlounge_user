import Logo from '@/old/assets/svgs/headerLogo.svg';
import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { moderateScale } from '@/lib/responsive-dimensions';
import useUserStore from '@/modules/user';
import { constants } from '@/old/constants';
import { useTheme } from '@/old/lib/theme';
import { colors } from '@/theme';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../ui/icon';
type propsType = {
  isHome?: boolean;
  title?: string;
  isBack?: boolean;
  isWallet?: boolean;
  locationEnable?: boolean;
  style?: StyleProp<ViewStyle>;
};

const CustomHeader = ({ isHome, title, isBack, isWallet, locationEnable, style }: propsType) => {
  const place = useUserStore((state) => state.place);
  const { theme } = useTheme();

  const handleBack = () => {
    if (title === 'Profile') {
      router.navigate('/(root)/(main)/(tab)');
      return;
    }
    router.back();
  };

  const handleWallet = () => {
    router.navigate('/old/wallet');
  };

  return (
    <SafeAreaView style={[{ backgroundColor: colors.backgroundPrimary }, style]} edges={['top']}>
      <View style={[styles.headerContainer]}>
        {isHome ? (
          <Logo height={35} />
        ) : (
          <View style={styles.titleContainer}>
            <TouchableOpacity
              onPress={handleBack}
              style={[
                {
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
                !isBack && { display: 'none' },
              ]}>
              <FontAwesome name="chevron-left" size={20} color="#00205B" />
            </TouchableOpacity>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        )}

        {isHome && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity style={styles.locationContainer}>
              <Entypo name="location-pin" size={20} color="#253D8F" />
              <Text style={styles.locationText}>{place ?? ''}</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() =>
                router.navigate({
                  pathname: '/old/profile',
                })
              }>
              <Icon name="User" size={moderateScale(25)} />
            </Pressable>
          </View>
        )}

        {isWallet && (
          <TouchableOpacity onPress={handleWallet} style={styles.walletContainer}>
            <FontAwesome5 name="wallet" size={24} color="#253D8F" />
          </TouchableOpacity>
        )}
        {locationEnable && (
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <TouchableOpacity style={styles.locationContainer}>
              <Entypo name="location-pin" size={20} color="#253D8F" />
              <Text style={styles.locationText}>{place ?? ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon fill="#253D8F" name="Menu" size={moderateScale(25)} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#00205B',
    fontSize: 18,
    fontFamily: constants.fontPopM,
    marginLeft: 20,
  },
  locationContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#253D8F',
    fontSize: 14,
    fontFamily: constants.fontPopM,
    marginLeft: 1,
  },
  walletContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default CustomHeader;
