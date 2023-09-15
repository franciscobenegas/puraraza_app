import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenName } from "../../utils";
import {
  UsuarioScreen,
  CambioContraScreen,
  CambioNombreScreen,
} from "../../screens/Usuario";

const Stack = createNativeStackNavigator();

export function UsuarioStack() {
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
        name={screenName.usuario.usuario}
        component={UsuarioScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenName.usuario.cambiarContra}
        component={CambioContraScreen}
        options={{ title: "Cambiar Contraseña" }}
      />
      <Stack.Screen
        name={screenName.usuario.cambioNombre}
        component={CambioNombreScreen}
        options={{ title: "Cambiar Nombre" }}
      />
    </Stack.Navigator>
  );
}
