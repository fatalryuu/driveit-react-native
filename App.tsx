import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInPage } from "./src/pages/SignInPage";
import { SignUpPage } from "./src/pages/SignUpPage";
import { RootStackParamList } from "./src/types";
import { ProfilePage } from "./src/pages/ProfilePage";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignInPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUpPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfilePage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
