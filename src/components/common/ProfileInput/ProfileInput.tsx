import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../../../palette";
import { FirestoreUser } from "../../../api/usersApi";
import { Flex } from "../Flex/Flex";
import { Typography } from "../Typography/Typography";

interface ProgileInputProps {
  value: string;
  setUser: React.Dispatch<React.SetStateAction<FirestoreUser | undefined>>;
  name: string;
  title: string;
  disabled?: boolean;
}

export const ProfileInput: React.FC<ProgileInputProps> = ({
  value,
  setUser,
  name,
  title,
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerStyle = isFocused
    ? { ...styles.inputContainer, ...styles.inputContainerFocused }
    : styles.inputContainer;

  return name === "birthday" ? (
    <View style={{ width: "80%" }}>
      <Flex alignItems="center" justifyContent="space-between">
        <Typography>Birthday</Typography>
        {value || !disabled ? (
          <DateTimePicker
            value={value ? new Date(value) : new Date()}
            mode="date"
            onChange={(_, date) =>
              setUser((prev) => ({
                ...(prev as FirestoreUser),
                birthday: date?.toISOString(),
              }))
            }
            accentColor={COLORS.PRIMARY}
            themeVariant="dark"
            disabled={disabled}
          />
        ) : (
          <Typography>No data</Typography>
        )}
      </Flex>
    </View>
  ) : (
    <View style={styles.container}>
      <Flex column alignItems="flex-start" gap={6}>
        <Typography>{title}</Typography>
        <View style={containerStyle}>
          <TextInput
            placeholder="No data"
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
