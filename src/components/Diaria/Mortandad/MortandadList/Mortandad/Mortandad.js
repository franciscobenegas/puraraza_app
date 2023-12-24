import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MortandadCtrl } from "../../../../../api";
import Toast from "react-native-root-toast";

export function Mortandad(props) {
  const { mortandad, mortandadId, onReload } = props;
  const navigation = useNavigation();
  const goToUpdate = () => {
    navigation.navigate("AddEditMortandad", { mortandadId });
  };

  const deleteMortandadAlert = () => {
    Alert.alert(
      `Eliminar ${mortandad.nombre}`,
      "Estas seguro de que deseas eliminar este Dato!!!",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: deleteMortandad,
        },
      ],
      { canselable: false }
    );
  };

  const deleteMortandad = async () => {
    try {
      await MortandadCtrl.delete(mortandadId);
      onReload();
      Toast.show("Registro eliminado correctamente", {
        position: Toast.positions.CENTER,
        duration: Toast.durations.LONG,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    } catch (error) {
      Toast.show("Error al Eliminar el Dato", {
        position: Toast.positions.CENTER,
        duration: Toast.durations.LONG,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{mortandad.NroCaravana}</Text>
      <Text style={styles.titulo}>{mortandad.NroCaravanaMadre}</Text>
      <Text style={styles.titulo}>{mortandad.NroCaravanaPadre}</Text>
      <Text style={styles.titulo}>
        {mortandad.causa_mortandad.data.attributes.nombre}
      </Text>
      <Text style={styles.titulo}>
        {mortandad.clasificacion.data.attributes.nombre}
      </Text>
      <Text style={styles.titulo}>{mortandad.fecha}</Text>

      <View style={styles.actions}>
        <Button
          mode="contained"
          icon="file-edit-outline"
          buttonColor="mediumblue"
          onPress={goToUpdate}
        >
          Editar
        </Button>

        <Button
          mode="contained"
          icon="delete-outline"
          buttonColor="firebrick"
          onPress={deleteMortandadAlert}
        >
          Eliminar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.9,
    borderRadius: 15,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "lightblue",
  },
  titulo: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  subTitulo: {
    paddingBottom: 5,
  },
});
