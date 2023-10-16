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
import { motivoEntradaCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { MotivoEntradaList } from "../../../components/Configuracion/MotivoEntrada";

export function MotivoEntradaScreen() {
  const [motivoEntrada, setMotivoEntrada] = useState(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  const [reload, setReload] = useState(false);

  useFocusEffect(
    useCallback(() => {
      recuperaMotivoEntrada();
    }, [reload])
  );

  const recuperaMotivoEntrada = async () => {
    const response = await motivoEntradaCtrl.getAll(user.establesimiento.id);
    setMotivoEntrada(response?.data || []);
  };
  const goToAddRegistro = () => {
    navigation.navigate("AddEditMotivoEntrada");
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

      {!motivoEntrada ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
          animating={true}
        />
      ) : size(motivoEntrada) === 0 ? (
        <Text style={styles.notipoRaza}> No tiene registros cargados...</Text>
      ) : (
        <MotivoEntradaList motivoEntrada={motivoEntrada} onReload={onReload} />
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
