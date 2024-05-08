import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { FirestoreCar, carsApi } from "../api/carsApi";
import { CarCard } from "../components/common/CarCard/CarCard";
import { Flex } from "../components/common/Flex/Flex";
import { Loader } from "../components/common/Loader/Loader";
import { Spacer } from "../components/common/Spacer/Spacer";
import { Typography } from "../components/common/Typography/Typography";
import { SearchInput } from "../components/pages/CarsPage/SearchInput/SearchInput";
import { COLORS } from "../palette";
import { FirebaseError, Navigation } from "../types";

interface CarsPageProps {
  navigation: Navigation;
}

export const CarsPage: React.FC<CarsPageProps> = ({ navigation }) => {
  const [cars, setCars] = useState<FirestoreCar[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    carsApi
      .getCars()
      .then(setCars)
      .catch((err: FirebaseError) => alert(err.message));
  }, []);

  if (cars.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Loader />
      </View>
    );
  }

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Flex column gap={20}>
        <Flex column alignItems="center" gap={16}>
          <Typography size={38} weight="700">
            Cars List
          </Typography>
          <SearchInput
            value={search}
            setValue={setSearch}
            placeholder="Search..."
          />
        </Flex>
        <ScrollView style={styles.scrollContainer}>
          <Flex column gap={20}>
            {filteredCars.length ? (
              filteredCars.map((car) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Car", { car })}
                  key={car.id}
                >
                  <CarCard car={car} />
                </TouchableOpacity>
              ))
            ) : (
              <>
                <Spacer size={0} />
                <Typography weight="700" size={24} color={COLORS.DARK_GREY}>
                  No cars found for "{search}"
                </Typography>
              </>
            )}
          </Flex>
          <Spacer size={150} />
        </ScrollView>
      </Flex>
    </KeyboardAvoidingView>
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
