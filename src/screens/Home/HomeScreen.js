import React from "react";
import { Text, StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { Grafico } from "../../components/Graficos";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.txtTituloCentral}>
        Estadisticas {new Date().getFullYear()}
      </Text>

      <Grafico tituloTxt="Mortandad General" porcentaje={5} />
      <Grafico tituloTxt="Mortandad Ternero" porcentaje={15} />
      <Grafico tituloTxt="Mortandad Jovenes" porcentaje={35} />
      <Grafico tituloTxt="Mortandad Adultos" porcentaje={75} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
    //backgroundColor: "#fff",
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
    marginTop: 20,
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
});
