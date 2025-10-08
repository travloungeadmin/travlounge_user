import { ImageBackground } from 'expo-image';
import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import Logo_main from '@/assets/svgs/logo_main.svg';
import { Box, Device, scaleSize, Text } from '@/core';
import { colors } from '@/theme';
import type {
  CarouselItem,
  CarouselRenderItemProps,
  ImageCarouselProps,
} from '@/types/components/auth/image-carousel.types';

const CAROUSEL_DATA: CarouselItem[] = [
  {
    image: require('@/assets/images/bg-Img-1.jpg'),
    title: 'Explore the world',
    desc: 'Travelling made trouble free',
  },
  {
    image: require('@/assets/images/bg-Img-2.jpg'),
    title: 'See the world behind',
    desc: 'Go safe, secured and stylish',
  },
  {
    image: require('@/assets/images/bg-Img-3.jpg'),
    title: 'Top of the world',
    desc: 'We serve hygiene first',
  },
];

const CarouselSlide = memo(({ item }: CarouselRenderItemProps) => (
  <ImageBackground source={item.image} contentFit="cover" style={styles.imageBackground}>
    <Box style={styles.textContainer}>
      <Logo_main width={scaleSize(162)} height={scaleSize(44)} style={styles.logo} />
      <Text preset="POP_28_M" color={colors.textTertiary} style={styles.title}>
        {item.title}
      </Text>
      <Text preset="POP_14_R" color={colors.textTertiary} style={styles.description}>
        {item.desc}
      </Text>
    </Box>
  </ImageBackground>
));

CarouselSlide.displayName = 'CarouselSlide';

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  autoPlayInterval = 5000,
  scrollAnimationDuration = 1000,
}) => {
  const carouselWidth = Device.width;
  const carouselHeight = Device.height * 0.75;

  const renderItem = useMemo(
    () => (props: CarouselRenderItemProps) => <CarouselSlide {...props} />,
    []
  );

  return (
    <Box style={styles.container}>
      <Carousel
        loop
        width={carouselWidth}
        height={carouselHeight}
        autoPlay
        data={CAROUSEL_DATA}
        scrollAnimationDuration={scrollAnimationDuration}
        autoPlayInterval={autoPlayInterval}
        renderItem={renderItem}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '70%',
    width: '100%',
    borderBottomLeftRadius: scaleSize(20),
    borderBottomRightRadius: scaleSize(20),
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginTop: scaleSize(90),
    marginLeft: scaleSize(40),
    marginRight: scaleSize(20),
  },
  logo: {
    marginBottom: scaleSize(41),
  },
  title: {
    marginBottom: scaleSize(10),
  },
  description: {
    marginTop: scaleSize(10),
  },
});

ImageCarousel.displayName = 'ImageCarousel';

export default memo(ImageCarousel);
