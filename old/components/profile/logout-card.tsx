import useUserStore from '@/modules/user';
import { constants } from '@/old/constants';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const LogoutCard = () => {
  const { reset } = useUserStore();

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
          router.replace('/auth');
          router.setParams({ initial: 'true' });
        },
      },
    ]);
  };
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          height: 49,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#00205B',
          width: 150,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: constants.fontPopSB,
            fontSize: 18,
            color: '#00205B',
            textAlign: 'center',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutCard;
