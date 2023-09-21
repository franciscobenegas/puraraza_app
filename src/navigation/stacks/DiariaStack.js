import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenName } from "../../utils";
import {
  MortandadScreen,
  NacimientoScreen,
  EntradaScreen,
  SalidaScreen,
  PesajeScreen,
  DiariaScreen,
} from "../../screens/Diaria";

const Stack = createNativeStackNavigator();

export function DiariaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#16222b" },
        cardStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen
        name={screenName.diaria.diaria}
        component={DiariaScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={screenName.diaria.mortandad}
        component={MortandadScreen}
      />
      <Stack.Screen
        name={screenName.diaria.nacimiento}
        component={NacimientoScreen}
      />
      <Stack.Screen
        name={screenName.diaria.entrada}
        component={EntradaScreen}
      />
      <Stack.Screen name={screenName.diaria.salida} component={SalidaScreen} />
      <Stack.Screen name={screenName.diaria.pesaje} component={PesajeScreen} />
    </Stack.Navigator>
  );
}
