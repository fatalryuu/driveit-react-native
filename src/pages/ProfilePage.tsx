import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { Button } from "../components/common/Button/Button";
import { Typography } from "../components/common/Typography/Typography";
import { Navigation } from "../types";

interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Typography>Profile</Typography>
      <Button onClick={() => {}}>
        <Typography>Logout</Typography>
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#090909",
  },
});
