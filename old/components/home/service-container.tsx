import { constants } from '@/old/constants';
import queryClient from '@/services/query';
import QUERIES_KEY from '@/services/query/query-keys';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
// import queryClient from "../services/query";
// import QUERIES_KEY from "../services/query/query-keys";

const windowWidth = Dimensions.get('window').width;

function generateServicesArr(rawServicesArr, services, categories) {
  try {
    return rawServicesArr.map((item) => {
      try {
        const serviceName = item.service_name?.toLowerCase();

        // Match service by name
        const matchedService = services.find((s) => s.service_name?.toLowerCase() === serviceName);

        if (!matchedService) {
          console.warn(`⚠️ Service not found for: "${item.service_name}"`);
        }

        // Resolve category name
        const categoryName =
          item.category_name || matchedService?.service_name || item.service_name || 'Unknown';

        // Match category by name
        const matchedCategory = categories.find(
          (c) => c.category_name?.toLowerCase() === categoryName.toLowerCase()
        );

        if (!matchedCategory) {
          console.warn(`⚠️ Category ID not found for: "${categoryName}"`);
        }

        return {
          ...item,
          id: matchedCategory?.id ?? null,
          category_name: categoryName,
          description: matchedService?.description || 'No description available.',
          image: matchedService?.image || '',
        };
      } catch (itemError) {
        console.error(`❌ Error processing item:`, item, '\n', itemError);
        return {
          ...item,
          id: null,
          category_name: item.category_name || 'Unknown',
          description: 'Error loading description.',
          image: '',
        };
      }
    });
  } catch (err) {
    console.error('🔥 Failed to generate services array:', err);
    return [];
  }
}

const ServiceContainer = () => {
  const [reqServices, setReqServices] = useState([]);
  const data = queryClient.getQueryData([QUERIES_KEY.HOME]);
  const services = data?.services;
  const category = queryClient.getQueryData([QUERIES_KEY.CATEGORY_LIST]);

  const servicesArr = [
    {
      category_name: 'Hygeinic Washrooms',
      displayName: 'WASHROOM',
      logo: require('@/old/assets/images/toloo.png'),
      shadowColor: '#1999FF',
      LinearGradientColor: ['#94CFFF', '#1999FF'],
      name: 'Hygeinic Washrooms',
      service_name: 'Washroom',
    },
    {
      displayName: 'SLEEPING POD',
      logo: require('@/old/assets/images/sleepingPod.png'),
      shadowColor: '#6D8AFC',
      LinearGradientColor: ['#B5C4FF', '#6D8AFC'],
      name: 'Sleeping pod',
      service_name: 'Sleeping pod',
      category_name: 'Sleeping pod',
    },
    {
      displayName: 'BEAN WAGON',
      logo: require('@/old/assets/images/beanWagon.png'),
      shadowColor: '#24ACF3',
      LinearGradientColor: ['#82E1FF', '#24ACF3'],
      name: 'Cafe',
      service_name: 'Bean wagon',
      category_name: 'Cafe',
    },
    {
      displayName: 'CAR WASH',
      logo: require('@/old/assets/images/carWash.png'),
      shadowColor: '#9480FE',
      LinearGradientColor: ['#CABFFF', '#9480FE'],
      name: 'Car Wash',
      service_name: 'Car wash',
      category_name: 'Car Wash',
    },
    {
      displayName: 'EV-CHARGE',
      logo: require('@/old/assets/images/evCharge.png'),
      shadowColor: '#129BE2',
      LinearGradientColor: ['#3FCFFC', '#129BE2'],
      name: 'EV Charge',
      service_name: 'EV charging',
    },
    {
      displayName: 'FILLOMART',
      logo: require('@/old/assets/images/fillomart.png'),
      shadowColor: '#836FF1',
      LinearGradientColor: ['#B7A9FB', '#836FF1'],
      name: 'Travelmart',
      service_name: 'Fillomart',
      category_name: 'Travelmart',
    },
  ];

  const mergedArray = generateServicesArr(servicesArr, services, category);

  useEffect(() => {
    setReqServices(mergedArray);
  }, [services]);

  console.log('reqServices', reqServices);

  return (
    <View style={styles.container}>
      {reqServices?.map((item, index) => {
        return (
          <View key={index} style={styles.serviceWrapper}>
            <TouchableOpacity
              onPress={() => {
                if (
                  item?.service_name !== 'Sleeping pod' &&
                  item?.service_name !== 'Washroom' &&
                  item?.service_name !== 'Bean wagon' &&
                  item?.service_name !== 'Fillomart'
                ) {
                  router.navigate({
                    pathname: '/services/coming-soon',
                    params: { service: item.id, name: item.name },
                  });
                  return;
                }
                if (item?.displayName === 'SLEEPING POD') {
                  router.navigate('/services/sleeping-pod');
                  return;
                }
                router.navigate({
                  pathname: '/services/service',
                  params: { service: item.id, name: item.name, is_travlounge: 'true' },
                });
              }}>
              <Shadow
                containerStyle={[
                  styles.shadowContainer,
                  { shadowColor: item.shadowColor, elevation: 20 },
                ]}
                distance={Platform.OS == 'android' ? 7 : 0}
                {...(Platform.OS == 'android' && {
                  offset: [0, 4],
                  startColor: `${item.shadowColor}55`,
                })}>
                <LinearGradient
                  colors={item.LinearGradientColor}
                  angle={180}
                  style={styles.linearGradient}>
                  <View style={styles.innerContent}>
                    <Image source={item.logo} style={styles.logoImage} contentFit="contain" />
                    <Text style={styles.serviceName}>{item.displayName}</Text>
                  </View>
                </LinearGradient>
              </Shadow>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceWrapper: {
    padding: 15,
  },
  shadowContainer: {
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  linearGradient: {
    height: (windowWidth - 90) / 3 + 20,
    width: (windowWidth - 90.1) / 3,
    borderRadius: 10,
  },
  innerContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  logoImage: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  serviceName: {
    fontSize: 10,
    fontFamily: constants.fontPopSB,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
});

export default ServiceContainer;
