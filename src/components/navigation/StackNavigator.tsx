import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { SignInPage } from "../../pages/SignInPage";
import { SignUpPage } from "../../pages/SignUpPage";
import { TabsNavigator } from "./TabsNavigator";
import { CarInfoPage } from "../../pages/CarInfoPage";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="Car" component={CarInfoPage} />
      <Stack.Screen name="Main" component={TabsNavigator} />
    </Stack.Navigator>
  );
};
