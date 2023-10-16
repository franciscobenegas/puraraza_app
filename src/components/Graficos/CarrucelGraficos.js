import React from "react";
import { StyleSheet, View } from "react-native";
import { Grafico } from "../../components/Graficos";
import PagerView from "react-native-pager-view";

export function CarrucelGraficos() {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 10,
      }}
    >
      <PagerView style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
          <Grafico
            size={150}
            strokeWidth={20}
            text="50%"
            progressPercent={50}
            pgColor="dodgerblue"
            textColor="dodgerblue"
            tituloTxt="Mortandad General"
          />
        </View>
        <View style={styles.page} key="2">
          <Grafico
            size={150}
            strokeWidth={20}
            text="70%"
            progressPercent={70}
            pgColor="navy"
            textColor="navy"
            tituloTxt="Mortandad Ternero"
          />
        </View>
        <View style={styles.page} key="3">
          <Grafico
            size={150}
            strokeWidth={20}
            text="80%"
            progressPercent={80}
            pgColor="indigo"
            textColor="indigo"
            tituloTxt="Mortandad Jovenes"
          />
        </View>
        <View style={styles.page} key="4">
          <Grafico
            size={150}
            strokeWidth={20}
            text="95%"
            progressPercent={95}
            pgColor="darkorange"
            textColor="darkorange"
            tituloTxt="Mortandad Adultos"
          />
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
