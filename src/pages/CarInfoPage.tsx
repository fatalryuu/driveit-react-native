import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View, Text } from "react-native";
import { Flex } from "../components/common/Flex/Flex";
import { Spacer } from "../components/common/Spacer/Spacer";
import { Typography } from "../components/common/Typography/Typography";
import { ImagesSlider } from "../components/pages/CarInfoPage/ImagesSlider/ImagesSlider";
import { PageTitle } from "../components/pages/CarInfoPage/PageTitle/PageTitle";
import { COLORS } from "../palette";
import { FirebaseError, Navigation, RootStackParamList } from "../types";
import { CarDescription } from "../components/pages/CarInfoPage/CarDescription/CarDescription";
import { Button } from "../components/common/Button/Button";
import { Loader } from "../components/common/Loader/Loader";
import { carsApi } from "../api/carsApi";
import { usersApi } from "../api/usersApi";

type Route = NativeStackScreenProps<RootStackParamList, "Car">["route"];

interface CarInfoProps {
  navigation: Navigation;
  route: Route;
}

export const CarInfoPage: React.FC<CarInfoProps> = ({ navigation, route }) => {
  const { car } = route.params;
  const [isFavourite, setIsFavourite] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    carsApi
      .isCarFavourite(car.id)
      .then((result) => {
        setIsFavourite(result);
        setIsLoading(false);
      })
      .catch((err: FirebaseError) => alert(err.message));
  }, []);

  const handleButtonClick = () => {
    setIsLoading(true);
    if (isFavourite) {
      usersApi
        .removeCarFromFavourites(car.id)
        .then(() => setIsFavourite(false))
        .catch((err: FirebaseError) => alert(err.message))
        .finally(() => setIsLoading(false));
    } else {
      usersApi
        .addCarToFavourites(car.id)
        .then(() => setIsFavourite(true))
        .catch((err: FirebaseError) => alert(err.message))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <PageTitle name={car.name} navigation={navigation} />

      <Spacer size={30} />

      <Flex column alignItems="center" gap={8}>
        <ImagesSlider images={car.images} />
        <CarDescription content={car.description} />
        <Button onClick={handleButtonClick} disabled={isLoading}>
          {isLoading ? (
            <Loader invert />
          ) : (
            <Typography size={18}>
              {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
            </Typography>
          )}
        </Button>
      </Flex>
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
