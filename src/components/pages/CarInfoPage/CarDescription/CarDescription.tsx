import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { Typography } from "../../../common/Typography/Typography";
import { Flex } from "../../../common/Flex/Flex";
import { COLORS } from "../../../../palette";
import { Spacer } from "../../../common/Spacer/Spacer";

interface CarDescriptionProps {
  content: string;
}

export const CarDescription: React.FC<CarDescriptionProps> = ({ content }) => {
  return (
    <Flex column gap={10}>
      <Typography weight="700" size={30}>
        Description
      </Typography>
      <ScrollView style={styles.textWrapper}>
        <Text style={styles.text}>{content}</Text>
      </ScrollView>
      <Spacer size={10} />
    </Flex>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    height: "45%",
    width: "88%",
    alignSelf: "center",
    overflow: "scroll",
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 18,
  },
});
