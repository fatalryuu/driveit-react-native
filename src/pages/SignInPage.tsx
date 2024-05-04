import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Button } from "../components/common/Button/Button";
import { Flex } from "../components/common/Flex/Flex";
import { Input } from "../components/common/Input/Input";
import { Spacer } from "../components/common/Spacer/Spacer";
import { Typography } from "../components/common/Typography/Typography";
import { COLORS } from "../palette";
import { Navigation } from "../types";

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

  const handleSignIn = () => {
    if (password.length < 8) {
      setError("Password must have at least 8 characters");
      return;
    }
    setIsLoading(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Flex column alignItems="center">
        <Typography size={32} weight="700">
          Welcome Back
        </Typography>
        <Spacer size={18} />
        <Typography size={18}>Please, enter your credentials</Typography>
        <Spacer size={24} />
        <Input value={email} setValue={setEmail} placeholder="Email" />
        <Spacer size={16} />
        <Input
          value={password}
          setValue={setPassword}
          placeholder="Password"
          password
        />
        <Spacer size={error ? 12 : 24} />
        {error && <Typography color={COLORS.RED}>{error}</Typography>}
        <Spacer size={error ? 12 : 0} />
        <Button onClick={handleSignIn} disabled={isDisabled || isLoading}>
          <Typography
            color={isLoading ? COLORS.LIGHT_GREY : COLORS.WHITE}
            size={18}
            weight="600"
          >
            Sign In
          </Typography>
        </Button>
        <Spacer size={10} />
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Typography color={COLORS.LIGHT_GREY}>
            Don't have an account?
          </Typography>
        </TouchableOpacity>
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
    backgroundColor: "#090909",
  },
});
