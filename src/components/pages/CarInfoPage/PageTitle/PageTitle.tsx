import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Navigation } from "../../../../types";
import { COLORS } from "../../../../palette";
import { Typography } from "../../../common/Typography/Typography";

interface PageTitleProps {
  navigation: Navigation;
  name: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ navigation, name }) => {
  return (
    <>
      <View style={styles.arrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color={COLORS.PRIMARY} />
        </TouchableOpacity>
      </View>
      <View style={styles.nameWrapper}>
        <Typography weight="700" size={28}>
          {name}
        </Typography>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
