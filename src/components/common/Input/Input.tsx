import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../../palette";

interface InputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  password?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  setValue,
  placeholder,
  password,
}) => {
  const [isSecure, setIsSecure] = useState(!!password);
  const [isFocused, setIsFocused] = useState(false);
  const containerStyle = isFocused
    ? { ...styles.container, ...styles.containerFocused }
    : styles.container;

  const toggleSecureTextEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={isSecure}
        placeholder={placeholder}
        placeholderTextColor={COLORS.DARK_GREY}
        value={value}
        onChangeText={(text) => setValue(text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
      />
      {password && (
        <TouchableOpacity style={styles.eye} onPress={toggleSecureTextEntry}>
          <FontAwesome
            name={isSecure ? "eye-slash" : "eye"}
            size={24}
            color={COLORS.LIGHT_GREY}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerFocused: {
    borderColor: COLORS.WHITE,
  },
  container: {
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "80%",
  },
  input: {
    color: COLORS.WHITE,
    height: 40,
    fontSize: 18,
  },
  eye: {
    position: "absolute",
    right: 15,
    top: 12,
  },
});
