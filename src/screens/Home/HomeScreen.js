import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { CarrucelGraficos } from "../../components/Graficos/CarrucelGraficos";
import { BarraGrafico, Grafico2 } from "../../components/Graficos";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.txtTituloCentral}>
        Estadisticas {new Date().getFullYear()}
      </Text>
      <CarrucelGraficos />
      <BarraGrafico />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 30,
  },
  txtCirculo: {
    fontSize: 35,
    fontWeight: "500",
    color: "#3d5875",
  },
  txtTituloCentral: {
    fontSize: 25,
    fontWeight: "500",
    color: "#3d5875",
    marginBottom: 20,
    marginTop: 30,

    alignItems: "center",
    paddingLeft: 30,
  },
  txtTituloMortandad: {
    fontSize: 20,
    fontWeight: "500",
    color: "#3d5875",
  },
  containerGrafico: {
    flexDirection: "row",
  },
  izquierda: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  derecha: { flex: 1 },
  viewPager: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
