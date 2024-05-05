import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabsNavigator } from "./src/components/navigation/TabsNavigator";
import { SignInPage } from "./src/pages/SignInPage";
import { SignUpPage } from "./src/pages/SignUpPage";
import { RootStackParamList } from "./src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="Main" component={TabsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
