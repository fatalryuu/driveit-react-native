import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { COLORS } from "../../../../palette";
import { Flex } from "../../../common/Flex/Flex";
import { Loader } from "../../../common/Loader/Loader";
import { Typography } from "../../../common/Typography/Typography";
import { AsyncImage } from "./AsyncImage/AsyncImage";

const WIDTH = 360;
const HEIGHT = 200;
const BORDER_RADIUS = 10;

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

  if (!images.length) {
    return (
      <View style={styles.fallback}>
        <Typography weight="700" size={24} color={COLORS.DARK_GREY}>
          No images of this car yet
        </Typography>
      </View>
    );
  }

  if (images.length === 1) {
    return (
      <Flex column alignItems="center" gap={10}>
        <AsyncImage
          uri={images[0]}
          width={WIDTH}
          height={HEIGHT}
          radius={BORDER_RADIUS}
        />
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
        </View>
      </Flex>
    );
  }

  return (
    <Flex column alignItems="center" gap={10}>
      <Carousel
        width={WIDTH}
        height={HEIGHT}
        data={images}
        onProgressChange={(_, index) => setActiveIndex(getRoundedIndex(index))}
        renderItem={({ index }) => (
          <AsyncImage uri={images[index]} width={WIDTH} height={HEIGHT} />
        )}
        style={{ borderRadius: BORDER_RADIUS }}
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
  fallback: {
    width: WIDTH,
    height: HEIGHT,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: COLORS.DARK_GREY,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
  },
});
