import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Flex } from "../components/common/Flex/Flex";
import { Spacer } from "../components/common/Spacer/Spacer";
import { Typography } from "../components/common/Typography/Typography";
import { FirebaseError, Navigation } from "../types";
import { COLORS } from "../palette";
import { FirestoreCar } from "../api/carsApi";
import { CarCard } from "../components/common/CarCard/CarCard";
import { usersApi } from "../api/usersApi";
import { useIsFocused } from "@react-navigation/native";
import { Loader } from "../components/common/Loader/Loader";

interface FavouritesPageProps {
  navigation: Navigation;
}

export const FavouritesPage: React.FC<FavouritesPageProps> = ({
  navigation,
}) => {
  const isScreenFocused = useIsFocused();
  const [favouriteCars, setFavouriteCars] = useState<FirestoreCar[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    usersApi
      .getFavouriteCars()
      .then(setFavouriteCars)
      .catch((err: FirebaseError) => alert(err.message))
      .finally(() => setIsLoading(false));
  }, [isScreenFocused]);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Flex column gap={20}>
        <Typography weight="700" size={38}>
          Favourites
        </Typography>
        <ScrollView style={styles.scrollContainer}>
          <Flex column gap={20}>
            {favouriteCars.length ? (
              favouriteCars.map((car) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Car", { car })}
                  key={car.id}
                >
                  <CarCard car={car} />
                </TouchableOpacity>
              ))
            ) : (
              <Flex column gap={8}>
                <Spacer size={16} />
                <Typography weight="700" size={24} color={COLORS.DARK_GREY}>
                  No favourite cars
                </Typography>
                <Typography weight="700" size={24} color={COLORS.DARK_GREY}>
                  Visit "Cars" page to add some
                </Typography>
              </Flex>
            )}
          </Flex>
          <Spacer size={90} />
        </ScrollView>
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
  scrollContainer: {
    width: "100%",
  },
});
