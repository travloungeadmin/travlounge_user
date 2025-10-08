import { constants } from '@/old/constants';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const screenWidth = Dimensions.get('window').width;
const SupportCard = () => {
  const sendWhatsAppMessage = async () => {
    const message = 'Hello, I need help with my order'; // Replace with the message you want to send
    const phoneNumber = '+916235224422'; // Replace with the recipient's phone number
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
    } catch (error) {
      Alert.alert('Error', 'Failed to open WhatsApp');
    }
  };
  return (
    <Shadow distance={8}>
      <LinearGradient
        colors={['#F3F7FA', '#DDE0E5']}
        angle={159}
        style={{ width: screenWidth - 40, borderRadius: 6, padding: 20 }}>
        <Text
          style={{
            fontFamily: constants.fontPopM,
            fontSize: 16,
            color: '#00205B',
            marginBottom: Platform.OS === 'ios' ? 8 : 0,
          }}>
          Help and support
        </Text>
        <Text
          style={{
            fontFamily: constants.fontPopR,
            fontSize: 13,
            color: '#00205B',
            marginBottom: 20,
          }}>
          Our virtual assistant is ready to swiftly resolve your service concerns. Click here to get
          started!
        </Text>
        <Shadow distance={4} offset={[3, 3]}>
          <TouchableOpacity
            onPress={sendWhatsAppMessage}
            style={{ borderRadius: 10, overflow: 'hidden' }}>
            <LinearGradient
              colors={['#6D8AFC', '#B5C4FF']}
              angle={358}
              style={{
                width: screenWidth - 80,
                alignItems: 'center',
                paddingVertical: 15,
              }}>
              <Text
                style={{
                  fontFamily: constants.fontPopM,
                  fontSize: 16,
                  color: '#FBFAFF',
                }}>
                Chat with us
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Shadow>
      </LinearGradient>
    </Shadow>
  );
};

export default SupportCard;

const styles = StyleSheet.create({});
