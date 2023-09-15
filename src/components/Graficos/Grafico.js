import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export function Grafico(props) {
  const { tituloTxt, porcentaje } = props;
  return (
    <View style={styles.containerGrafico}>
      <View style={styles.izquierda}>
        <Text style={styles.txtTituloMortandad}>{tituloTxt}</Text>
      </View>
      <View style={styles.derecho}>
        <AnimatedCircularProgress
          size={115}
          width={12}
          fill={porcentaje}
          tintColor="tomato"
          backgroundColor="#3d5875"
          padding={10}
          lineCap="round"
          rotation={0}
          backgroundWidth={5}
        >
          {(fill) => <Text style={styles.txtCirculo}>{porcentaje}%</Text>}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerGrafico: {
    backgroundColor: "mediumaquamarine", //powderblue
    flexDirection: "row",
    borderRadius: 30,
    marginBottom: 10,

    paddingHorizontal: 10,
  },
  txtCirculo: {
    fontSize: 30,
    fontWeight: "500",
    color: "#3d5875",
  },
  txtTituloMortandad: {
    fontSize: 20,
    fontWeight: "500",
    color: "#3d5875",
  },

  izquierda: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  derecha: { flex: 1 },
});
