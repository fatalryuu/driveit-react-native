import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FirestoreCar } from "../api/carsApi";
import { Typography } from "../components/common/Typography/Typography";
import { COLORS } from "../palette";
import { Navigation, RootStackParamList } from "../types";
import { FontAwesome } from "@expo/vector-icons";
import { Flex } from "../components/common/Flex/Flex";
import { Spacer } from "../components/common/Spacer/Spacer";
import { PageTitle } from "../components/pages/CarInfoPage/PageTitle/PageTitle";
import { ImagesSlider } from "../components/pages/CarInfoPage/ImagesSlider/ImagesSlider";

type Route = NativeStackScreenProps<RootStackParamList, "Car">["route"];

interface CarInfoProps {
  navigation: Navigation;
  route: Route;
}

export const CarInfoPage: React.FC<CarInfoProps> = ({ navigation, route }) => {
  const { car } = route.params;

  return (
    <View style={styles.container}>
      <PageTitle name={car.name} navigation={navigation} />

      <Spacer size={30} />

      {car.images.length ? (
        <ImagesSlider images={car.images} />
      ) : (
        <Typography weight="700" size={24} color={COLORS.DARK_GREY}>
          No images of this car yet
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.BLACK,
    paddingTop: 60,
    width: "100%",
  },
  nameWrapper: {
    width: "80%",
    marginLeft: "3%",
  },
  arrow: {
    position: "absolute",
    top: 68,
    left: 20,
  },
});
