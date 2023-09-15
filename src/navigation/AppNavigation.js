import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigation } from "./TabNavigation";
import { screenName } from "../utils";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={screenName.tab} component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
