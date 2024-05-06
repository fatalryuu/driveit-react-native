import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../../palette";

interface LoaderProps {
  invert?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ invert }) => {
  return (
    <ActivityIndicator
      size="small"
      color={invert ? COLORS.WHITE : COLORS.PRIMARY}
    />
  );
};
