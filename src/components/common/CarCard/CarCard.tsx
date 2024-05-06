import React from "react";
import { StyleSheet, View } from "react-native";
import { FirestoreCar } from "../../../api/carsApi";
import { COLORS } from "../../../palette";
import { Typography } from "../Typography/Typography";

interface CarCardProps {
  car: FirestoreCar;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Typography weight="600" size={24}>
          {car.name}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 180,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.PRIMARY,
    height: "100%",
    width: "90%",
    borderRadius: 10,
  },
});
