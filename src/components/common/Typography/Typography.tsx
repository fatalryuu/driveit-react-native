import React from "react";
import { Text } from "react-native";
import { COLORS } from "../../../palette";

type FontWeight = "400" | "500" | "600" | "700";

interface TypographyProps {
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: FontWeight;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  size: fontSize = 16,
  color = COLORS.WHITE,
  weight: fontWeight = "500",
}) => {
  return (
    <Text style={{ fontSize, color, fontWeight, textAlign: "center" }}>
      {children}
    </Text>
  );
};
