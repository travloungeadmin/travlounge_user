import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ContainerCard from '../common/container-card';

import { getCurrentGreeting } from '@/modules/home';
import useUserStore from '@/modules/user';
import Icon from '@/old/assets/svgs/icons/icon.svg';
import { constants } from '@/old/constants';
import { Device } from '@/old/lib/device';
import { getPackagesListQuery } from '@/services/query/home';

const PackagesContainer = () => {
  const { user } = useUserStore();
  const { data } = getPackagesListQuery();
  if (!data) return null;
  const item = data[0];
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}>
        <View style={styles.cardContainer}>
          <ContainerCard>
            <View style={styles.cardContent}>
              <Image
                source={require('@/old/assets/images/weatherMoistlySunny.png')}
                style={styles.image}
              />

              <Text style={styles.greetingText}>{getCurrentGreeting()},</Text>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.subscribeText}>Please subscribe to explore</Text>
              <View style={styles.servicesContainer}>
                {item?.display_description?.map((service) => (
                  <View style={styles.serviceItem}>
                    <Text style={styles.serviceText}>{service.number + ' ' + service.name}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.footer}>
                <Text style={styles.amount}>₹ {item?.amount}</Text>
                <TouchableOpacity
                  onPress={() =>
                    router.navigate({
                      pathname: '/old/packge',
                      params: { packageDetails: JSON.stringify(item) },
                    })
                  }
                  style={styles.subscribeButton}>
                  <LinearGradient colors={['#6D8AFC', '#B5C4FF']} angle={0} style={styles.gradient}>
                    <Text style={styles.subscribeButtonText}>Subscribe</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ContainerCard>
        </View>

        <ContainerCard>
          <View style={[styles.cardContainer, { padding: 20, height: '100%' }]}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#00205B',
                }}>
                Other {'\n'}best plans
              </Text>
              <Icon />
            </View>
            {data.slice(1, 3).map((item) => (
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 14,
                    fontWeight: 'medium',
                    color: '#00205B',
                  }}>
                  {item.package_name} package
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 13,
                    fontWeight: 'regular',
                    color: '#31456A',
                  }}>
                  ₹ {item.amount}
                </Text>
              </View>
            ))}

            {data.length > 3 && (
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  fontWeight: 'medium',
                  color: '#00205B',
                }}>
                More...
              </Text>
            )}
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={() =>
                  router.navigate({
                    pathname: '/old/packge',
                    params: {
                      isPlans: true,
                      plans: JSON.stringify(data),
                    },
                  })
                }
                style={styles.subscribeButton}>
                <LinearGradient colors={['#6D8AFC', '#B5C4FF']} angle={0} style={styles.gradient}>
                  <Text style={styles.subscribeButtonText}>Explore</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ContainerCard>
      </View>
    </ScrollView>
  );
};

export default PackagesContainer;

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: "row",
  //   gap: 30,
  //   paddingHorizontal: 20,
  //   paddingVertical: 20,
  // },
  cardContainer: {
    width: Device.width * 0.6,
  },
  cardContent: {
    padding: 20,
  },
  image: {
    height: 70,
    width: 70,
  },
  greetingText: {
    fontFamily: constants.fontPopM,
    fontSize: 14,
    color: '#00205B',
  },
  userName: {
    fontFamily: constants.fontPopB,
    fontSize: 21,
    color: '#00205B',
  },
  subscribeText: {
    fontFamily: constants.fontPopM,
    fontSize: 14,
    marginVertical: 10,
    color: '#00205B',
  },
  servicesContainer: {
    height: 55,
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  amount: {
    color: '#00205B',
    fontSize: 16,
    fontFamily: constants.fontRobB,
  },
  subscribeButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  subscribeButtonText: {
    fontFamily: constants.fontPopSB,
    fontSize: 14,
    color: '#FFFFFF',
  },
});
