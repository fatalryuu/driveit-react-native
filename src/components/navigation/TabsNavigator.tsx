import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfilePage } from "../../pages/ProfilePage";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../palette";
import { Typography } from "../common/Typography/Typography";
import { CarsPage } from "../../pages/CarsPage";
import { FavouritesPage } from "../../pages/FavouritesPage";
import { tabToIcon, TabsList } from "../../types";

const Tab = createBottomTabNavigator();

const options = (name: TabsList) => ({
  title: name,
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    return (
      <FontAwesome
        name={tabToIcon[name]}
        size={24}
        color={focused ? COLORS.PRIMARY : COLORS.DARK_GREY}
      />
    );
  },
  tabBarLabel: ({ focused }: { focused: boolean }) => {
    return (
      <Typography size={12} color={focused ? COLORS.PRIMARY : COLORS.DARK_GREY}>
        {name}
      </Typography>
    );
  },
  tabBarStyle: {
    backgroundColor: COLORS.BLACK,
    borderTopWidth: 0,
    height: 90,
  },
});

export const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={options("Profile")}
      />
      <Tab.Screen name="Cars" component={CarsPage} options={options("Cars")} />
      <Tab.Screen
        name="Favourites"
        component={FavouritesPage}
        options={options("Favourites")}
      />
    </Tab.Navigator>
  );
};
