import React from "react";
import { View, FlexAlignType } from "react-native";

type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

interface FlexProps {
  children: React.ReactNode;
  column?: boolean;
  justifyContent?: JustifyContent;
  alignItems?: FlexAlignType;
  gap?: number;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  column,
  justifyContent,
  alignItems,
  gap,
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: column ? "column" : "row",
        justifyContent,
        alignItems,
        gap,
        width: "100%",
      }}
    >
      {children}
    </View>
  );
};
