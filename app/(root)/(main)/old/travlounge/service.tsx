import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// import { BannerContainer, CustomHeader } from "../components";
import LowOpacitySleepingPod from '@/old/assets/svgs/lowOpacitySleepingPod.svg';
import SleepingPod from '@/old/assets/svgs/sleepingPod.svg';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Shadow } from 'react-native-shadow-2';

import { ThemedText } from '@/components/common/ThemedText';
import { useSafeAreaInsets } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import CustomHeader from '@/old/components/common/custom-header';
import Loading from '@/old/components/common/Loading';
import BannerContainer from '@/old/components/home/banner-container';
import { Device } from '@/old/lib/device';
import { getSingleServiceQuery } from '@/services/query/home';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const Service = () => {
  const { id, name } = useLocalSearchParams();
  const { data: serviceDashboard, isFetching } = getSingleServiceQuery(Number(id));
  const { theme } = useTheme();

  if (isFetching) return <Loading />;

  const CouponCount = () => {
    return (
      <View
        style={{
          height: 80,
          width: screenWidth - 120,
          borderColor: '#9581FE',
          borderWidth: 1,
          borderRadius: 15,
          alignSelf: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginRight: 47,
          paddingLeft: 15,
          gap: 10,
        }}>
        <ThemedText
          style={{
            fontSize: 41,
            // fontFamily: constants.fontPopSB,
            color: '#00205B',
            paddingTop: Platform.OS === 'android' ? 7 : 2,
          }}>
          {serviceDashboard?.coupons?.remaining}
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 14,
            // fontFamily: constants.fontPopM,
            color: '#00205B',
          }}>
          Coupons {'\n'}You have
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 74,
            // fontFamily: constants.fontPopB,
            color: '#00205B',
            opacity: 0.03,
            position: 'absolute',
            right: 35,
            top: Platform.OS === 'android' ? -16 : -12,
            alignSelf: 'center',
          }}>
          {serviceDashboard?.coupons?.remaining}
        </ThemedText>
        <View
          style={{
            right: -47,
            top: -9,
            position: 'absolute',
            backgroundColor: '#EDF1F3',
            padding: 5,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: '#FFF',
          }}>
          <AnimatedCircularProgress
            size={80}
            width={4}
            fill={
              serviceDashboard?.coupons?.total == 0
                ? 0
                : (serviceDashboard?.coupons?.remaining * 100) / serviceDashboard?.coupons?.total
            }
            tintColor="#7E97FE"
            backgroundColor="#E0E6FF"
            rotation={0}>
            {() => (
              <Image
                source={require('@/old/assets/images/sampleQr.png')}
                style={{ height: 50, width: 50 }}
              />
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
    );
  };

  const ServiceBookedContainer = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Shadow distance={8}>
          <LinearGradient
            colors={['#F3F7FA', '#DDE0E5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              height: 100,
              alignSelf: 'center',
              width: screenWidth - 30,
              borderRadius: 6,
              padding: 15,
              // flexDirection: 'row',
              // alignItems: 'center',
              // gap: 20,
              justifyContent: 'space-between',
            }}>
            <ThemedText
              style={{
                fontSize: 13,
                // fontFamily: constants.fontPopM,
                color: '#00205B',
              }}>
              Your pod booking confirmed
            </ThemedText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <ThemedText
                  style={{
                    fontSize: 12,
                    // fontFamily: constants.fontPopR,
                    color: '#31456A',
                    opacity: 0.6,
                  }}>
                  Date
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 15,
                    // fontFamily: constants.fontPopSB,
                    color: '#31456A',
                  }}>
                  10-02-2022
                </ThemedText>
              </View>
              <View>
                <ThemedText
                  style={{
                    fontSize: 12,
                    // fontFamily: constants.fontPopR,
                    color: '#31456A',
                    opacity: 0.6,
                  }}>
                  Time
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 15,
                    // fontFamily: constants.fontPopSB,
                    color: '#31456A',
                  }}>
                  12:30 am
                </ThemedText>
              </View>
              <View>
                <ThemedText
                  style={{
                    fontSize: 12,
                    // fontFamily: constants.fontPopR,
                    color: '#31456A',
                    opacity: 0.6,
                  }}>
                  Duration
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 15,
                    // fontFamily: constants.fontPopSB,
                    color: '#31456A',
                  }}>
                  2 hours
                </ThemedText>
              </View>
            </View>
          </LinearGradient>
        </Shadow>
      </View>
    );
  };

  const BookingContainer = (props) => {
    const { couponCount = 0, progress = 0.7 } = props;
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(animation, {
        toValue: progress * screenWidth,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }, [progress]);

    return (
      <View
        style={{
          height: 130,
          flexDirection: 'row',
          paddingHorizontal: 15,
          gap: 50,
        }}>
        <Shadow
          containerStyle={[
            {
              shadowOffset: { width: 0, height: 7 },
              shadowOpacity: 0.8,
              shadowRadius: 6,
              elevation: 10,
            },
            { shadowColor: '#1999FF', elevation: 20 },
          ]}
          distance={Platform.OS == 'android' ? 7 : 0}
          {...(Platform.OS == 'android' && {
            offset: [0, 4],
            startColor: '#1999FF55',
          })}>
          <LinearGradient
            colors={['#94CFFF', '#1999FF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              height: 127,
              width: screenWidth / 2 - 40,
              padding: 8,
              paddingHorizontal: 15,
              borderRadius: 10,
              gap: 5,
            }}>
            <ThemedText
              style={{
                fontSize: 36,
                // fontFamily: constants.fontPopB,
                color: '#FFFFFF',
                marginBottom: Platform.OS === 'android' ? -14 : 0,
              }}>
              {couponCount}
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 12,
                // fontFamily: constants.fontPopR,
                color: '#FFFFFF',
              }}>
              Coupons{'\n'}You have
            </ThemedText>
            <View style={styles.container}>
              <Animated.View style={[styles.progressBar, { width: animation }]}></Animated.View>
            </View>
            <Image
              source={require('@/old/assets/images/lowOpacityQr.png')}
              style={{
                width: screenWidth / 2 - 40,
                height: 120,
                position: 'absolute',
                right: 0,
                bottom: 0,
              }}
            />
          </LinearGradient>
        </Shadow>
        <TouchableOpacity onPress={() => router.navigate('/old/booking')}>
          <Shadow
            containerStyle={[
              {
                shadowOffset: { width: 0, height: 7 },
                shadowOpacity: 0.8,
                shadowRadius: 6,
                elevation: 10,
              },
              { shadowColor: '#836FF1', elevation: 20 },
            ]}
            distance={Platform.OS == 'android' ? 7 : 0}
            {...(Platform.OS == 'android' && {
              offset: [0, 4],
              startColor: '#836FF155',
            })}>
            <LinearGradient
              colors={['#B7A9FB', '#836FF1']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{
                height: 127,
                width: screenWidth / 2 - 40,
                borderRadius: 10,
                justifyContent: 'center',
                paddingLeft: 15,
                gap: 10,
              }}>
              <SleepingPod />
              <ThemedText
                style={{
                  fontSize: 12,
                  // fontFamily: constants.fontPopR,
                  color: '#FFFFFF',
                }}>
                Book your{'\n'}Sleeping pod
              </ThemedText>
              <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <LowOpacitySleepingPod />
              </View>
            </LinearGradient>
          </Shadow>
        </TouchableOpacity>
      </View>
    );
  };

  const SpecialityItemCard = ({ item }) => {
    const cardHeight = screenWidth * 0.85 + 15 + screenWidth * 0.6 * 0.85;

    return (
      <View style={{ height: cardHeight, alignSelf: 'center' }}>
        <Image
          source={{
            uri: item.image.replace(/^media\//, ''),
          }}
          contentFit="cover"
          priority="high"
          style={styles.image}
        />

        <View
          style={{
            position: 'absolute',
            top: screenWidth * 0.75 * 0.85,
            left: 45,
          }}>
          <Shadow
            style={{
              width: screenWidth * 0.75 - 60,
              borderRadius: 10,
              padding: 20,
              backgroundColor: '#FFFFFFA5',
              height: screenWidth * 0.7,
              borderColor: '#FFFFFFA6',
              borderWidth: 1,
            }}>
            <ThemedText style={styles.serviceName}>{item.service_name}</ThemedText>
            <ThemedText style={styles.description}>{item.description}</ThemedText>
          </Shadow>
        </View>
      </View>
    );
  };

  const { bottomHeight } = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <CustomHeader isHome={false} title={name} isBack={true} isWallet={false} />
      {serviceDashboard?.servicetypes?.length === 0 && serviceDashboard?.banners?.length === 0 && (
        <View
          style={{
            height: '100%',
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ThemedText variant="headlineEmphasized" color="primary">
            Coming Soon!
          </ThemedText>
          <ThemedText variant="bodyEmphasized" color="primary">
            We are working for you
          </ThemedText>
          <Image
            source={require('@/assets/images/coming_soon_make_a_trip.png')}
            priority="high"
            style={{
              width: Device.width,
              height: Device.width * 1.105,
            }}
            contentFit="contain"
          />
        </View>
      )}
      <ScrollView style={{ flex: 1 }}>
        {serviceDashboard?.servicetypes?.length === 0 &&
        serviceDashboard?.banners?.length === 0 ? null : (
          <View style={{ gap: 20 }}>
            <BannerContainer banners={serviceDashboard?.banners} />
            {id === '1' ? (
              <>
                <BookingContainer couponCount={serviceDashboard?.coupons?.remaining} />
                {/* <ServiceBookedContainer /> */}
              </>
            ) : (
              <CouponCount />
            )}
            <FlatList
              data={serviceDashboard?.servicetypes}
              renderItem={({ item }) => <SpecialityItemCard item={item} />}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Service;

const styles = StyleSheet.create({
  image: {
    width: screenWidth * 0.75,
    height: screenWidth * 0.85,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: -1,
  },

  serviceName: {
    fontSize: 17,
    // fontFamily: constants.fontPopSB,
    color: '#31456A',
    marginBottom: 15,
  },
  description: {
    fontSize: 13,
    // fontFamily: constants.fontPopR,
    color: '#31456A',
  },
  container: {
    width: '100%',
    height: 10,
    backgroundColor: '#FFFFFF33',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
});
