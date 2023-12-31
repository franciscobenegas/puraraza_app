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
  PropietarioScreen,
  PotreroScreen,
} from "../../screens/Configuracion";
import { AddEditTipoRazaScreen } from "../../screens/Configuracion/TipoRazaScreen/AddEditTipoRazaScreen/AddEditTipoRazaScreen";
import { AddEditCausaMortandadScreen } from "../../screens/Configuracion/CausaMortandadScreen/AddEditCausaMortandadScreen/AddEditCausaMortandadScreen";
import { AddEditMotivoPesajeScreen } from "../../screens/Configuracion/MotivoPesajeScreen/AddEditMotivoPesajeScreen/AddEditMotivoPesajeScreen";
import { AddEditMotivoEntradaScreen } from "../../screens/Configuracion/MotivoEntradaScreen/AddEditMotivoEntradaScreen/AddEditMotivoEntradaScreen";
import { AddEditMotivoSalidaScreen } from "../../screens/Configuracion/MotivoSalidaScreen/AddEditMotivoSalidaScreen/AddEditMotivoSalidaScreen";
import { AddEditClasificacionScreen } from "../../screens/Configuracion/ClasificacionScreen/AddEditClasificacionScreen/AddEditClasificacionScreen";
import { AddEditPropietarioScreen } from "../../screens/Configuracion/PropietarioScreen/AddEditPropietarioScreen/AddEditPropietarioScreen";
import { AddEditPotreroScreen } from "../../screens/Configuracion/PotreroScreen/AddEditPotreroScreen/AddEditPotreroScreen";
import { EditEstablesimientoScreen } from "../../screens/Configuracion/EstablesimientoScreen/AddEditEstablesimientoScreen/AddEditEstablesimientoScreen";

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
        name={screenName.config.propietario}
        component={PropietarioScreen}
        options={{ title: "Propietario" }}
      />

      <Stack.Screen
        name={screenName.config.potrero}
        component={PotreroScreen}
        options={{ title: "Potrero" }}
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
      <Stack.Screen
        name="AddEditMotivoEntrada"
        component={AddEditMotivoEntradaScreen}
        options={{ title: "Motivo Entrada (Editar)" }}
      />

      <Stack.Screen
        name="AddEditMotivoSalida"
        component={AddEditMotivoSalidaScreen}
        options={{ title: "Motivo Salida (Editar)" }}
      />

      <Stack.Screen
        name="AddEditClasificacion"
        component={AddEditClasificacionScreen}
        options={{ title: "Clasificacion (Editar)" }}
      />

      <Stack.Screen
        name="AddEditEstablesimiento"
        component={EditEstablesimientoScreen}
        options={{ title: "Establesimiento (Editar)" }}
      />

      <Stack.Screen
        name="AddEditPropietario"
        component={AddEditPropietarioScreen}
        options={{ title: "Propietario (Editar)" }}
      />

      <Stack.Screen
        name="AddEditPotreroScreen"
        component={AddEditPotreroScreen}
        options={{ title: "Potrero (Editar)" }}
      />
    </Stack.Navigator>
  );
}
