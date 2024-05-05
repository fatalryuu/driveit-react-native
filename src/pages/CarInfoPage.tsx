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

type Route = NativeStackScreenProps<RootStackParamList, "Car">["route"];

interface CarInfoProps {
  navigation: Navigation;
  route: Route;
}

export const CarInfoPage: React.FC<CarInfoProps> = ({ navigation, route }) => {
  const { car } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.arrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color={COLORS.PRIMARY} />
        </TouchableOpacity>
      </View>
      <Typography weight="600" size={24}>
        {car.name}
      </Typography>
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
  arrow: {
    position: "absolute",
    top: 60,
    left: 20,
  },
});
