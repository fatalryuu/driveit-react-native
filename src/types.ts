import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { FirestoreCar } from "./api/carsApi";

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
  Car: { car: FirestoreCar };
};

export type TabsList = "Profile" | "Cars" | "Favourites";

export const tabToIcon: Record<TabsList, "user" | "car" | "heart"> = {
  Profile: "user",
  Cars: "car",
  Favourites: "heart",
};

export type Navigation =
  NativeStackScreenProps<RootStackParamList>["navigation"];

export interface FirebaseError extends Error {
  code: string;
}
