import { useState, useCallback, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { ActivityIndicator, AnimatedFAB } from "react-native-paper";
import { size } from "lodash";
import { nacimientoCtrl, clasificacionCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { NacimientoList } from "../../../components/Configuracion/Nacimiento";

export const NacimientoScreen = () => {
  const [nacimiento, setNacimiento] = useState(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  const [reload, setReload] = useState(false);
  const [refrescar, setRefrescar] = useState(true);
  const [clasificacionMenor, setClasificacionMenor] = useState([]);

  useFocusEffect(
    useCallback(() => {
      recuperaNacimiento();
    }, [reload])
  );

  useEffect(() => {
    recuperaClasificacion();
  }, []);

  const recuperaClasificacion = async () => {
    const response = await clasificacionCtrl.getAll(user.establesimiento.id);
    const result = await response.data;
    const dataMenor = result.filter(
      (item) => item.attributes.dosAnhos === "Recien Nacido"
    );
    setClasificacionMenor(dataMenor);
  };

  const recuperaNacimiento = async () => {
    setRefrescar(true);
    const response = await nacimientoCtrl.getAll(user.establesimiento.id);
    setNacimiento(response?.data || []);
    setRefrescar(false);
  };

  const goToAddRegistro = () => {
    navigation.navigate("AddEditNacimientoScreen");
  };

  const onReload = () => {
    setReload((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={styles.containerSA}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refrescar}
            onRefresh={recuperaNacimiento}
            size="large"
            //progressBackgroundColor="steelblue"
            colors={["navy", "navy", "navy"]}
          />
        }
      >
        {!nacimiento ? (
          <Text
            style={{
              marginTop: 90,
              marginLeft: 100,
              fontSize: 16,
              fontWeight: "bold",
              color: "steelblue",
            }}
          >
            Cargando Datos ...
          </Text>
        ) : size(nacimiento) === 0 ? (
          <Text style={styles.notipoRaza}> No tiene registros cargados...</Text>
        ) : (
          <NacimientoList
            nacimiento={nacimiento}
            onReload={onReload}
            clasificacionMenor={clasificacionMenor}
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
