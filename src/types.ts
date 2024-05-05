import { type NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Profile: undefined;
};

export type Navigation =
  NativeStackScreenProps<RootStackParamList>["navigation"];

export interface FirebaseError extends Error {
  code: string;
}
