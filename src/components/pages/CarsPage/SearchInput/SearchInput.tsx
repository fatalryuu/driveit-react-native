import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../../../palette";

interface SearchInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  setValue,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerStyle = isFocused
    ? { ...styles.container, ...styles.containerFocused }
    : styles.container;

  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.DARK_GREY}
        value={value}
        onChangeText={(text) => setValue(text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
      />
      {value && (
        <TouchableOpacity style={styles.clear} onPress={() => setValue("")}>
          <FontAwesome name="close" size={20} color={COLORS.LIGHT_GREY} />
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
    width: "90%",
  },
  input: {
    color: COLORS.WHITE,
    height: 40,
    fontSize: 18,
    width: "92%",
  },
  clear: {
    position: "absolute",
    right: 12,
    top: 8,
  },
});
