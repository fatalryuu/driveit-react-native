import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { COLORS } from "../../../../palette";
import { Flex } from "../../../common/Flex/Flex";
import { Loader } from "../../../common/Loader/Loader";

const WIDTH = 360;
const HEIGHT = 200;

interface ImagesSliderProps {
  images: string[];
}

export const ImagesSlider: React.FC<ImagesSliderProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getRoundedIndex = (index: number): number => {
    const rounded = Math.round(index);
    return rounded > images.length - 1 ? 0 : rounded;
  };

  return (
    <Flex column alignItems="center" gap={10}>
      <Carousel
        width={WIDTH}
        height={HEIGHT}
        data={images}
        onProgressChange={(_, index) => setActiveIndex(getRoundedIndex(index))}
        renderItem={({ index }) => (
          <View>
            <Image
              style={styles.image}
              source={{ uri: images[index] }}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
            />
            {isLoading && (
              <View style={{ position: "absolute", top: "50%", left: "50%" }}>
                <Loader />
              </View>
            )}
          </View>
        )}
        style={{ borderRadius: 10 }}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            style={[styles.dot, index === activeIndex && styles.activeDot]}
            key={index}
          />
        ))}
      </View>
    </Flex>
  );
};

const styles = StyleSheet.create({
  image: {
    width: WIDTH,
    height: HEIGHT,
  },
  dot: {
    backgroundColor: COLORS.DARK_GREY,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: COLORS.PRIMARY,
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
});
