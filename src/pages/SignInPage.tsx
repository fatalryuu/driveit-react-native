import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "../components/common/Button/Button";
import { Flex } from "../components/common/Flex/Flex";
import { Input } from "../components/common/Input/Input";
import { Spacer } from "../components/common/Spacer/Spacer";
import { Typography } from "../components/common/Typography/Typography";
import { COLORS } from "../palette";
import { FirebaseError, Navigation } from "../types";
import { getAuth } from "../../firebase";
import { useAuthListenerHook } from "../hooks/useAuthListenerHook";

interface SignInPageProps {
  navigation: Navigation;
}

export const SignInPage: React.FC<SignInPageProps> = ({ navigation }) => {
  const isScreenFocused = useIsFocused();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isScreenFocused) {
      setEmail("");
      setPassword("");
      setIsDisabled(true);
      setIsLoading(false);
      setError("");
    }
  }, [isScreenFocused]);

  useEffect(() => {
    if (email && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  useAuthListenerHook(navigation);

  const handleSignIn = async () => {
    if (password.length < 8) {
      setError("Password must have at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (err) {
      switch ((err as FirebaseError).code) {
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        case "auth/invalid-credential":
          setError("Invalid email or password");
          break;
        default:
          setError((err as FirebaseError).message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Flex column alignItems="center">
        <Flex column gap={24}>
          <Flex column gap={18}>
            <Typography size={36} weight="700">
              Welcome Back
            </Typography>
            <Typography size={18}>Please, enter your credentials</Typography>
          </Flex>
          <Flex column alignItems="center" gap={16}>
            <Input value={email} setValue={setEmail} placeholder="Email" />
            <Input
              value={password}
              setValue={setPassword}
              placeholder="Password"
              password
            />
          </Flex>
        </Flex>

        <Spacer size={error ? 12 : 20} />
        {error && <Typography color={COLORS.RED}>{error}</Typography>}
        <Spacer size={error ? 12 : 0} />

        <Flex column alignItems="center" gap={10}>
          <Button onClick={handleSignIn} disabled={isDisabled || isLoading}>
            <Typography
              color={isLoading ? COLORS.LIGHT_GREY : COLORS.WHITE}
              size={18}
              weight="600"
            >
              Sign In
            </Typography>
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Typography color={COLORS.LIGHT_GREY}>
              Don't have an account?
            </Typography>
          </TouchableOpacity>
        </Flex>
      </Flex>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.BLACK,
  },
});
