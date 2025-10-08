import { showSuccess } from '@/lib/toast';
import { constants } from '@/old/constants';
import { generateOTPMutation } from '@/services/query/auth';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const ResentOtpContainer = ({ number, isLogin }) => {
  const { mutate } = generateOTPMutation();

  const [timer, setTimer] = React.useState(60);

  React.useEffect(() => {
    if (!isLogin) {
      const interval = setInterval(() => {
        if (timer === 0) {
          clearInterval(interval);
        } else {
          setTimer(timer - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isLogin]);

  React.useEffect(() => {
    if (isLogin) {
      setTimer(60);
    }
  }, [isLogin]);

  const resentOtpHandler = () => {
    const formData = new FormData();
    formData.append('mobile_number', number);
    mutate(formData, {
      onSuccess: (res) => {
        showSuccess('Success', `OTP delivered! Please enter it to proceed.`, 3000);
        setTimer(60);
      },
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',

        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={resentOtpHandler} disabled={timer != 0}>
        <Shadow>
          <LinearGradient
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#F3F7FA',
              height: 47,
              width: 112,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            colors={['#F3F7FA', '#E6EAED']}>
            <Text
              style={{
                color: '#31456A',
                fontFamily: constants.fontRobM,
                fontSize: 14,
                opacity: timer === 0 ? 1 : 0.7,
              }}>
              Resent OTP
            </Text>
          </LinearGradient>
        </Shadow>
      </TouchableOpacity>
      {timer !== 0 && (
        <Text
          style={{
            fontSize: 14,
            fontFamily: constants.fontPopSB,
            color: '#00205B',
          }}>
          00:{timer}
        </Text>
      )}
    </View>
  );
};

export default ResentOtpContainer;

const styles = StyleSheet.create({});
