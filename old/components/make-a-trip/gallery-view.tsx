import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, scale } from "@/old/lib/responsive-dimensions";
import { Image } from "expo-image";
import ImageViewer from "react-native-image-zoom-viewer";
import { SafeAreaView } from "react-native-safe-area-context";

interface PropsType {
  images: string[];
}

const GalleryView = (props: PropsType) => {
  const { images } = props;
  const [showModal, setShowModal] = React.useState(false);

  const imagesList = images.map((item, index) => {
    return {
      url: item,
    };
  });
  console.log("viewList", imagesList);

  return (
    <View
      style={{
        display: "flex",
        flexWrap: "wrap",
        height: scale(235),

        margin: scale(7),
        justifyContent: "space-between",
        alignContent: "space-between",
      }}
    >
      {images?.map(
        (item, index) =>
          index < 3 && (
            <Pressable onPress={() => setShowModal(true)}>
              <Image
                key={index.toString()}
                contentFit="cover"
                source={{
                  uri: item,
                }}
                style={{
                  borderRadius: scale(2),
                  width:
                    images.length > 1
                      ? index === 0
                        ? scale(216)
                        : scale(93)
                      : "100%",
                  height: index === 0 ? "100%" : scale(115),
                }}
              >
                {images.length > 3 && index === 2 && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.58)",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: moderateScale(33),
                        fontFamily: "Poppins",
                        fontWeight: "medium",
                      }}
                    >
                      +{images.length - 3}
                    </Text>
                  </View>
                )}
              </Image>
            </Pressable>
          )
      )}

      <Modal
        onRequestClose={() => setShowModal(false)}
        visible={showModal}
        transparent={true}
      >
        <ImageViewer
          // index={}
          enableSwipeDown
          onSwipeDown={() => setShowModal(false)}
          imageUrls={imagesList}
        />
      </Modal>
    </View>
  );
};

export default GalleryView;

const styles = StyleSheet.create({});
