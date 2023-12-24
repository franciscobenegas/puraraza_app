import { useState, useCallback } from "react";
import React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, Text, StyleSheet, SafeAreaView } from "react-native";
import { ActivityIndicator, AnimatedFAB } from "react-native-paper";
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
    <SafeAreaView style={styles.containerSA}>
      <ScrollView style={styles.container}>
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
          <ClasificacionList
            clasificacion={clasificacion}
            onReload={onReload}
          />
        )}
      </ScrollView>
      <AnimatedFAB
        icon={"plus"}
        label={"Añadir Registro"}
        extended={true}
        onPress={goToAddRegistro}
        visible={true}
        animateFrom={"right"}
        style={styles.fabStyle}
        color="#fff"
      />
    </SafeAreaView>
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
  containerSA: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 5,
    right: 16,
    position: "absolute",
    backgroundColor: "darkcyan",
  },
});
