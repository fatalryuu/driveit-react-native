import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../Typography/Typography";
import { COLORS } from "../../../palette";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  const buttonStyle = disabled
    ? { ...styles.button, ...styles.disabledButton }
    : styles.button;

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
});
