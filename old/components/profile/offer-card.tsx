import { constants } from '@/old/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const screenWidth = Dimensions.get('window').width;

const OfferCard = ({ item }) => {
  return (
    <View style={{ flex: 1 }}>
      <Shadow distance={8}>
        <LinearGradient
          colors={['#F3F7FA', '#DDE0E5']}
          angle={180}
          style={{
            width: screenWidth * 0.6,
            borderRadius: 8,
            padding: 20,
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: constants.fontPopM,
              fontSize: 16,
              color: '#31456A',
              marginBottom: Platform.OS === 'ios' ? 8 : 0,
            }}>
            {item?.package_name}
          </Text>
          <View style={styles.servicesContainer}>
            {item?.display_description?.map((service) => (
              <View style={styles.serviceItem}>
                <Text style={styles.serviceText}>{service.number + ' ' + service.name}</Text>
              </View>
            ))}
          </View>
          <View style={{ flex: 1 }} />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: constants.fontRobB,
                fontSize: 16,
                color: '#00205B',
              }}>
              ₹ {item?.amount}
            </Text>
            <Shadow distance={4} offset={[3, 3]}>
              <TouchableOpacity
                disabled={item?.is_subscribed}
                onPress={() =>
                  router.navigate({
                    pathname: '/old/packge',
                    params: { packageDetails: JSON.stringify(item) },
                  })
                }
                style={{ borderRadius: 10, overflow: 'hidden' }}>
                <LinearGradient
                  colors={['#6D8AFC', '#B5C4FF']}
                  angle={0}
                  style={{
                    alignItems: 'center',
                    height: 33,
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: constants.fontPopSB,
                      fontSize: 14,
                      color: '#FFFFFF',
                    }}>
                    {item?.is_subscribed ? 'Subscribed' : 'Subscribe'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </Shadow>
          </View>
        </LinearGradient>
      </Shadow>
    </View>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  servicesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
  },
  serviceItem: {
    backgroundColor: '#E1E7F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  serviceText: {
    fontSize: 13,
    color: '#31456A',
    fontFamily: constants.fontPopR,
  },
});
