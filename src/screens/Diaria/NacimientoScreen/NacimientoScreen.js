import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, Text, StyleSheet, SafeAreaView } from "react-native";
import { ActivityIndicator, AnimatedFAB } from "react-native-paper";
import { size } from "lodash";
import { nacimientoCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { NacimientoList } from "../../../components/Configuracion/Nacimiento";

export const NacimientoScreen = () => {
  const [nacimiento, setNacimiento] = useState(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  const [reload, setReload] = useState(false);

  useFocusEffect(
    useCallback(() => {
      recuperaNacimiento();
    }, [reload])
  );

  const recuperaNacimiento = async () => {
    const response = await nacimientoCtrl.getAll(user.establesimiento.id);
    setNacimiento(response?.data || []);
  };

  const goToAddRegistro = () => {
    navigation.navigate("AddEditNacimientoScreen");
  };

  const onReload = () => {
    setReload((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={styles.containerSA}>
      <ScrollView style={styles.container}>
        {!nacimiento ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loading}
            animating={true}
          />
        ) : size(nacimiento) === 0 ? (
          <Text style={styles.notipoRaza}> No tiene registros cargados...</Text>
        ) : (
          <NacimientoList nacimiento={nacimiento} onReload={onReload} />
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
};

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
