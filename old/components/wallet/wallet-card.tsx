import { constants } from '@/old/constants';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const screenWidth = Dimensions.get('window').width;

const WalletCard = ({ data, isLoading, setIsAddMoneyClicked, isAddMoneyClicked }) => {
  const handleAddMoney = () => {
    setIsAddMoneyClicked((prev) => !prev);
  };

  return (
    <Shadow>
      <LinearGradient
        colors={['#F3F7FA', '#DDE0E5']}
        angle={139}
        style={{
          width: screenWidth - 40,
          borderRadius: 20,
          padding: 20,
          height: 180,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#babdbf',
        }}>
        <StatusBar backgroundColor="#F3F7FA" barStyle="dark-content" />
        <Text
          style={{
            fontFamily: constants.fontPopM,
            fontSize: 15,
            color: '#00205B',
            marginBottom: Platform.OS === 'ios' ? 8 : 0,
          }}>
          Travlounge Cash
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: constants.fontRobB,
              fontSize: 30,
              color: '#00205B',
            }}>
            ₹ {isLoading ? <ActivityIndicator /> : data.balance}
          </Text>
          <TouchableOpacity>
            <Entypo name="chevron-small-right" size={30} color="#707070" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleAddMoney}>
          <View
            style={{
              backgroundColor: 'black',
              borderRadius: 20,
              flexDirection: 'row',
              gap: 10,
              width: 150,
              justifyContent: 'center',
              height: 40,
              alignItems: 'center',
            }}>
            <MaterialIcons name="add" size={25} color="#FFFFFF" />
            <Text
              style={{
                fontFamily: constants.fontPopR,
                fontSize: 13,
                color: '#FFFFFF',
              }}>
              Add Money
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </Shadow>
  );
};

export default WalletCard;

const styles = StyleSheet.create({});
