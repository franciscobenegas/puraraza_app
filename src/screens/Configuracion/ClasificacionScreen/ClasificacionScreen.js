import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { IconButton, ActivityIndicator } from "react-native-paper";
import { size } from "lodash";
import { clasificacionCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { ClasificacionList } from "../../../components/Configuracion/Clasificacion";

export function ClasificacionScreen() {
  const [clasificacion, setClasificacion] = useState(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  const [reload, setReload] = useState(false);

  useFocusEffect(
    useCallback(() => {
      recuperaClasificacion();
    }, [reload])
  );

  const recuperaClasificacion = async () => {
    const response = await clasificacionCtrl.getAll(user.establesimiento.id);
    setClasificacion(response?.data || []);
  };

  const goToAddRegistro = () => {
    navigation.navigate("AddEditClasificacion");
  };

  const onReload = () => {
    setReload((prevState) => !prevState);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={goToAddRegistro}>
        <View style={styles.addDatos}>
          <Text style={styles.addText}>Añadir Nuevo Registro</Text>
          <IconButton icon="arrow-right-thick" size={25} color="#000" />
        </View>
      </TouchableOpacity>

      {!clasificacion ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
          animating={true}
        />
      ) : size(clasificacion) === 0 ? (
        <Text style={styles.notipoRaza}> No tiene registros cargados...</Text>
      ) : (
        <ClasificacionList clasificacion={clasificacion} onReload={onReload} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    marginBottom: 5,
  },
  loading: {
    marginTop: 100,
  },
  notipoRaza: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 18,
  },
  addDatos: {
    borderWidth: 0.9,
    borderRadius: 10,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
