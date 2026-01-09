import { ImageBackground } from 'expo-image';
import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import Logo_main from '@/assets/svgs/logo_main.svg';

import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import type {
  CarouselItem,
  CarouselRenderItemProps,
  ImageCarouselProps,
} from '@/types/components/auth/image-carousel.types';
import { ThemedText } from '../common/ThemedText';

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

const CarouselSlide = memo(({ item }: CarouselRenderItemProps) => {
  const { theme } = useTheme();
  return (
    <ImageBackground source={item.image} contentFit="cover" style={styles.imageBackground}>
      <View style={styles.textContainer}>
        <Logo_main width={moderateScale(162)} height={moderateScale(44)} style={styles.logo} />
        <ThemedText color="white" variant="headline" style={styles.title}>
          {item.title}
        </ThemedText>
        <ThemedText color="white" variant="bodyLarge" style={styles.description}>
          {item.desc}
        </ThemedText>
      </View>
    </ImageBackground>
  );
});

CarouselSlide.displayName = 'CarouselSlide';

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  autoPlayInterval = 5000,
  scrollAnimationDuration = 1000,
}) => {
  const carouselWidth = SPACING.deviceWidth;
  const carouselHeight = SPACING.deviceHeight * 0.75;

  const renderItem = useMemo(
    () => (props: CarouselRenderItemProps) => <CarouselSlide {...props} />,
    []
  );

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '70%',
    width: '100%',
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginTop: moderateScale(90),
    marginLeft: moderateScale(40),
    marginRight: moderateScale(20),
  },
  logo: {
    marginBottom: moderateScale(41),
  },
  title: {
    marginBottom: moderateScale(10),
  },
  description: {
    marginTop: moderateScale(10),
  },
});

ImageCarousel.displayName = 'ImageCarousel';

export default memo(ImageCarousel);
