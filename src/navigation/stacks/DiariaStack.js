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

import { AddEditNacimientoScreen } from "../../screens/Diaria/NacimientoScreen/AddEditNacimientoScreen/AddEditNacimientoScreen";

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
        options={{ title: "Mortandad Animal ☠️" }}
      />
      <Stack.Screen
        name={screenName.diaria.nacimiento}
        component={NacimientoScreen}
        options={{ title: "Naimiento 🐮" }}
      />
      <Stack.Screen
        name={screenName.diaria.entrada}
        component={EntradaScreen}
        options={{ title: "Entrada ⬅️" }}
      />
      <Stack.Screen
        name={screenName.diaria.salida}
        component={SalidaScreen}
        options={{ title: "Salida ➡️" }}
      />
      <Stack.Screen
        name={screenName.diaria.pesaje}
        component={PesajeScreen}
        options={{ title: "Pesaje ⏲️" }}
      />

      <Stack.Screen
        name="AddEditNacimientoScreen"
        component={AddEditNacimientoScreen}
        options={{ title: "Nacimiento (Editar)" }}
      />
    </Stack.Navigator>
  );
}
