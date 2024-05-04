import React from "react";
import { View } from "react-native";

interface SpacerProps {
  size: number;
}

export const Spacer: React.FC<SpacerProps> = ({ size }) => {
  return <View style={{ height: size }} />;
};
