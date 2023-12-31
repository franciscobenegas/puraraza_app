import { useState, useCallback } from "react";
import React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, Text, StyleSheet, SafeAreaView } from "react-native";
import { ActivityIndicator, AnimatedFAB } from "react-native-paper";
import { size } from "lodash";
import { MortandadCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { MortandadList } from "../../../components/Diaria/Mortandad";

export function MortandadScreen() {
  const [mortandad, setMortandad] = useState(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  const [reload, setReload] = useState(false);

  useFocusEffect(
    useCallback(() => {
      recuperaMortandad();
    }, [reload])
  );

  const recuperaMortandad = async () => {
    const response = await MortandadCtrl.getAll(user.establesimiento.id);
    setMortandad(response?.data || []);
  };

  const goToAddRegistro = () => {
    navigation.navigate("AddEditMortandad");
  };

  const onReload = () => {
    setReload((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={styles.containerSA}>
      <ScrollView style={styles.container}>
        {!mortandad ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loading}
            animating={true}
          />
        ) : size(mortandad) === 0 ? (
          <Text style={styles.notipoRaza}> No tiene registros cargados...</Text>
        ) : (
          <MortandadList mortandad={mortandad} onReload={onReload} />
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
