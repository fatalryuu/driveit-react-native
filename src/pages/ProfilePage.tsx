import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { Button } from "../components/common/Button/Button";
import { Typography } from "../components/common/Typography/Typography";
import { Navigation } from "../types";
import { useAuthListenerHook } from "../hooks/useAuthListenerHook";
import { FIREBASE_AUTH } from "../../firebase";

interface ProfilePageProps {
  navigation: Navigation;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ navigation }) => {
  useAuthListenerHook(navigation);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Typography>Profile</Typography>
      <Button onClick={() => signOut(FIREBASE_AUTH)}>
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
