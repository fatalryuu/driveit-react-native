import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../../palette";

export const Loader: React.FC = () => {
  return <ActivityIndicator size="small" color={COLORS.PRIMARY} />;
};
