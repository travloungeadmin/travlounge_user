import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import Icon from '@/components/ui/icon';
import { moderateScale } from '@/lib/responsive-dimensions';
import useSearchStore from '@/modules/search';
import { Device } from '@/old/lib/device';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const SearchBar = () => {
  const { toPlace, fromPlace } = useSearchStore();

  return (
    <View
      style={{
        marginTop: moderateScale(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TextInput
        value={fromPlace?.name}
        onPress={() =>
          router.navigate({
            pathname: '/old/search',
            params: {
              isFrom: true,
            },
          })
        }
        style={{
          borderWidth: 1,
          height: moderateScale(43),
          width: (Device.width - moderateScale(45)) / 2,
          borderColor: '#8A95BB',
          backgroundColor: '#F1F5F8',
          borderRadius: moderateScale(7),
          padding: moderateScale(15),
        }}
        placeholder="From"
      />
      <TextInput
        onPress={() =>
          router.navigate({
            pathname: '/old/search',
            params: {
              isFrom: false,
            },
          })
        }
        value={toPlace?.name}
        style={{
          borderWidth: 1,
          height: moderateScale(43),
          width: (Device.width - moderateScale(45)) / 2,
          borderColor: '#8A95BB',
          backgroundColor: '#F1F5F8',
          borderRadius: moderateScale(7),
          padding: moderateScale(15),
        }}
        placeholder="To"
      />
      <LinearGradient
        colors={['#B5C4FF', '#6D8AFC']}
        style={{
          marginLeft: (Device.width - moderateScale(45)) / 2 - moderateScale(5),
          alignSelf: 'center',
          position: 'absolute',
          height: moderateScale(25),
          width: moderateScale(25),
          borderRadius: moderateScale(7),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon stroke="#fff" name="ArrowRight" size={15} />
      </LinearGradient>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
