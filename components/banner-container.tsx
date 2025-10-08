import { shadow } from '@/constants';
import { Box, Image } from '@/core';
import { colors } from '@/theme';
import { router } from 'expo-router';
import React from 'react';
import { Animated, Dimensions, FlatList, Pressable, StyleSheet, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Indicator = ({ scrollx, data }) => {
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
            style={[styles.indicatorDot, { width: scale }]}></Animated.View>
        );
      })}
    </View>
  );
};

const BannerContainer = (props) => {
  const { banners } = props;
  const scrollx = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef(null);

  const BannerCard = ({ item }) => {
    return (
      <Box style={styles.bannerCardContainer}>
        <Box style={[shadow, styles.bannerCard]}>
          <Pressable
            onPress={() => {
              if (item?.service?.service_name === 'Sleeping pod') {
                router.navigate('/services/sleeping-pod');
              } else {
                // /services/service {"name": "Hygeinic Washrooms", "service": "1"}
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
              // source={require("@/assets/images/banner-1.jpeg")}
              style={styles.bannerImage}
              contentFit="cover"
              priority="high"
            />
          </Pressable>
        </Box>
      </Box>
    );
  };

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
    bottom: 25,
    left: 30,
  },
  indicatorDot: {
    height: 10,
    width: 10,
    backgroundColor: '#FFF',
    margin: 4,
    borderRadius: 5,
  },
  bannerCardContainer: {
    width: screenWidth,
    padding: 16,
    paddingBottom: 20,
  },
  bannerCard: {
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 10,
    shadowColor: '#717eff',
    shadowRadius: 5,
    shadowOffset: { height: 10, width: 0 },
  },
  bannerImage: {
    height: screenWidth * 0.51,
    borderRadius: 10,
  },
});

export default BannerContainer;
