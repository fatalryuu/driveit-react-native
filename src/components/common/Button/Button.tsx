import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../Typography/Typography";
import { COLORS } from "../../../palette";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  dark?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  dark,
}) => {
  const colorStyle = dark
    ? { ...styles.button, ...styles.darkButton }
    : styles.button;
  const buttonStyle = disabled
    ? { ...colorStyle, ...styles.disabledButton }
    : colorStyle;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onClick}
        disabled={disabled}
        style={buttonStyle}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "79%",
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: COLORS.DARK_GREY,
  },
  darkButton: {
    backgroundColor: COLORS.PRIMARY_DARK,
  },
});
