import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenName } from "../../utils";
import {
  CausaMortandadScreen,
  ClasificacionScreen,
  EstablesimientoScreen,
  MotivoEntradaScreen,
  MotivoPesajeScreen,
  MotivoSalidaScreen,
  TipoRazaScreen,
  ConfiguracionScreen,
  //AddEditTipoRazaScreen,
} from "../../screens/Configuracion";
import { AddEditTipoRazaScreen } from "../../screens/Configuracion/TipoRazaScreen/AddEditTipoRazaScreen/AddEditTipoRazaScreen";
import { AddEditCausaMortandadScreen } from "../../screens/Configuracion/CausaMortandadScreen/AddEditCausaMortandadScreen/AddEditCausaMortandadScreen";
import { AddEditMotivoPesajeScreen } from "../../screens/Configuracion/MotivoPesajeScreen/AddEditMotivoPesajeScreen/AddEditMotivoPesajeScreen";

const Stack = createNativeStackNavigator();

export function ConfiguracionStack() {
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
        name={screenName.config.config}
        component={ConfiguracionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenName.config.clasificacion}
        component={ClasificacionScreen}
        options={{ title: "Clasificacion" }}
      />
      <Stack.Screen
        name={screenName.config.causaMortandad}
        component={CausaMortandadScreen}
        options={{ title: "Causa de Mortandad" }}
      />
      <Stack.Screen
        name={screenName.config.establesimiento}
        component={EstablesimientoScreen}
        options={{ title: "Establesimiento" }}
      />
      <Stack.Screen
        name={screenName.config.motivoEntrada}
        component={MotivoEntradaScreen}
        options={{ title: "Motivo de Entrada" }}
      />
      <Stack.Screen
        name={screenName.config.motivoSalida}
        component={MotivoSalidaScreen}
        options={{ title: "Motivo de Salida" }}
      />
      <Stack.Screen
        name={screenName.config.motivoPesaje}
        component={MotivoPesajeScreen}
        options={{ title: "Motivo de Pesaje" }}
      />
      <Stack.Screen
        name={screenName.config.tipoRaza}
        component={TipoRazaScreen}
        options={{ title: "Tipo de Razas" }}
      />
      <Stack.Screen
        name="AddEditTipoRaza"
        component={AddEditTipoRazaScreen}
        options={{ title: "Tipos de Razas (Editar)" }}
      />
      <Stack.Screen
        name="AddEditCausaMortandad"
        component={AddEditCausaMortandadScreen}
        options={{ title: "Causa Mortandad (Editar)" }}
      />

      <Stack.Screen
        name="AddEditMotivoPesaje"
        component={AddEditMotivoPesajeScreen}
        options={{ title: "Motivo Pesaje (Editar)" }}
      />
    </Stack.Navigator>
  );
}
