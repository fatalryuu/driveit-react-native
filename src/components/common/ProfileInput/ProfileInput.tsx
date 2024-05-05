import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { COLORS } from "../../../palette";
import { FirestoreUser } from "../../../api/usersApi";
import { Flex } from "../Flex/Flex";
import { Typography } from "../Typography/Typography";

interface ProgileInputProps {
  value: string;
  setUser: React.Dispatch<React.SetStateAction<FirestoreUser | undefined>>;
  name: string;
  placeholder: string;
  disabled?: boolean;
}

export const ProfileInput: React.FC<ProgileInputProps> = ({
  value,
  setUser,
  name,
  placeholder,
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerStyle = isFocused
    ? { ...styles.inputContainer, ...styles.inputContainerFocused }
    : styles.inputContainer;

  return (
    <View style={styles.container}>
      <Flex column alignItems="flex-start" gap={5}>
        <Typography>{placeholder}</Typography>
        <View style={containerStyle}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={COLORS.DARK_GREY}
            value={value}
            onChangeText={(text) =>
              setUser((prev) => ({
                ...(prev as FirestoreUser),
                [name]: text,
              }))
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            editable={!disabled}
            style={styles.input}
          />
        </View>
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
  inputContainerFocused: {
    borderColor: COLORS.WHITE,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
    borderRadius: 6,
    paddingHorizontal: 10,
    width: "100%",
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
