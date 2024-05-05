import React from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { Flex } from "../components/common/Flex/Flex";
import { Spacer } from "../components/common/Spacer/Spacer";
import { Typography } from "../components/common/Typography/Typography";
import { Navigation } from "../types";

interface FavouritesPageProps {
  navigation: Navigation;
}

export const FavouritesPage: React.FC<FavouritesPageProps> = ({
  navigation,
}) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.scrollContainer}>
        <Flex column gap={20}>
          <Typography>Favourites</Typography>
        </Flex>
        <Spacer size={120} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#090909",
    width: "100%",
  },
  scrollContainer: {
    paddingTop: 70,
    width: "100%",
  },
});