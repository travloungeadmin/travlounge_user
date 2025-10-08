import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { colors, constants } from "@/old/constants";
import Logo_main from "@/old/assets/svgs/logo_main.svg";
import { Easing, useSharedValue } from "react-native-reanimated";
import { ImageBackground } from "expo-image";
import Carousel, { ICarouselInstance } from "@/old/lib/carousel";

const screenWidth = Dimensions.get("screen").width;

const data = [
  {
    image: require("@/assets/images/bg-Img-1.jpg"),
    title: "Explore the world",
    desc: "Travelling made trouble free",
  },
  {
    image: require("@/assets/images/bg-Img-2.jpg"),
    title: "See the world behind",
    desc: "Go safe, secured and stylish",
  },
  {
    image: require("@/assets/images/bg-Img-3.jpg"),
    title: "Top of the world",
    desc: "We serve hygiene first",
  },
];

const baseOptions = {
  height: "75%",
  vertical: false,
  width: screenWidth,
};

const withAnimation = {
  config: {
    duration: 400,
    easing: Easing.linear,
  },
  type: "timing",
};

const modeConfig = {
  parallaxScrollingOffset: 0,
  parallaxScrollingScale: 1,
};

const renderItem = ({ item }: any) => (
  <ImageBackground
    source={item.image}
    contentFit="cover"
    style={styles.imageBackground}
  >
    <View style={styles.textContainer}>
      <Logo_main width={162} height={44} style={styles.logo} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.desc}</Text>
    </View>
  </ImageBackground>
);

const AuthBackgroundCarousel = () => {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);

  return (
    <View style={styles.container}>
      <Carousel
        autoPlayInterval={5000}
        data={data}
        loop
        mode="parallax"
        modeConfig={modeConfig}
        onProgressChange={progress}
        pagingEnabled
        ref={ref}
        renderItem={renderItem}
        snapEnabled
        style={styles.carousel}
        withAnimation={withAnimation}
        {...baseOptions}
        autoPlay
      />
    </View>
  );
};

export default AuthBackgroundCarousel;

const styles = StyleSheet.create({
  container: {
    height: "70%",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  carousel: {
    flex: 1,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    marginTop: 90,
    marginLeft: 40,
    marginRight: 20,
  },
  logo: {
    marginBottom: 41,
  },
  title: {
    // fontFamily: constants.fontPopM,
    fontWeight: "medium",
    fontSize: 29,
    color: colors.white,
  },
  description: {
    fontFamily: constants.fontPopR,
    fontSize: 14,
    color: colors.white,
    marginTop: 10,
  },
});
