import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenName } from "../../utils";
import { HomeScreen, PruebaScreen } from "../../screens/Home";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenName.home.home} component={HomeScreen} />
      <Stack.Screen name={screenName.home.prueba} component={PruebaScreen} />
    </Stack.Navigator>
  );
}
