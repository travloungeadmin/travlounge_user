import { Image } from '@/lib/Image';
import { moderateScale } from '@/lib/responsive-dimensions';
import { useTheme } from '@/newTheme';

import { router } from 'expo-router';
import React from 'react';
import { Animated, Dimensions, FlatList, Pressable, StyleSheet, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface Banner {
  image: string;
  service: {
    id: number;
    service_name: string;
  };
}

interface IndicatorProps {
  scrollx: Animated.Value;
  data: Banner[];
}

const Indicator = ({ scrollx, data }: IndicatorProps) => {
  const { theme } = useTheme();
  return (
    <View style={styles.indicatorContainer}>
      {data?.map((_, i) => {
        const inputRange = [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth];
        const scale = scrollx.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={[styles.indicatorDot, { width: scale, backgroundColor: theme.white }]}
          />
        );
      })}
    </View>
  );
};

const BannerCard = ({ item }: { item: Banner }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.bannerCardContainer}>
      <View style={[styles.bannerCard, { backgroundColor: theme.white }]}>
        <Pressable
          onPress={() => {
            if (item?.service?.service_name === 'Sleeping pod') {
              router.navigate('/services/sleeping-pod');
            } else {
              router.navigate({
                pathname: '/services/service',
                params: {
                  id: item?.service?.id,
                  name: item?.service?.service_name,
                },
              });
            }
          }}>
          <Image
            source={{ uri: item?.image }}
            style={styles.bannerImage}
            contentFit="cover"
            priority="high"
          />
        </Pressable>
      </View>
    </View>
  );
};

const HomeBannerContainer = ({ banners }: { banners: Banner[] }) => {
  const scrollx = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef<FlatList>(null);

  return (
    <View>
      <FlatList
        data={banners}
        ref={flatListRef}
        scrollEventThrottle={32}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], {
          useNativeDriver: false,
        })}
        renderItem={({ item }) => <BannerCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      {banners.length > 1 && <Indicator data={banners} scrollx={scrollx} />}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: moderateScale(25),
    left: moderateScale(30),
  },
  indicatorDot: {
    height: moderateScale(10),
    width: moderateScale(10),

    margin: moderateScale(4),
    borderRadius: moderateScale(5),
  },
  bannerCardContainer: {
    width: screenWidth,
    padding: moderateScale(16),
    paddingBottom: moderateScale(20),
  },
  bannerCard: {
    borderRadius: moderateScale(10),
    shadowColor: '#717eff',
    shadowOffset: { height: moderateScale(10), width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(5),
    elevation: 12,
  },
  bannerImage: {
    height: screenWidth * 0.51,
    borderRadius: moderateScale(10),
  },
});

export default HomeBannerContainer;
