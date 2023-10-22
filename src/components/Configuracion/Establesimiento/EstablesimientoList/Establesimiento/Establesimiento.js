import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { establesimientoCtrl } from "../../../../../api";
import Toast from "react-native-root-toast";

export function Establesimiento(props) {
  const { establesimiento, establesimientoId, onReload } = props;
  const navigation = useNavigation();
  const goToUpdate = () => {
    navigation.navigate("AddEditEstablesimiento", { establesimientoId });
  };

  const deleteEstablesimientoAlert = () => {
    Alert.alert(
      `Eliminar ${establesimiento.nombre}`,
      "Estas seguro de que deseas elimanr este Dato!!!",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: deleteEstablesimiento,
        },
      ],
      { canselable: false }
    );
  };
  const deleteEstablesimiento = async () => {
    try {
      await establesimientoCtrl.delete(establesimientoId);
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
      <Text style={styles.titulo}>{establesimiento.nombre}</Text>
      <Text style={styles.subTitulo}>RUC: {establesimiento.ruc}</Text>
      <Text style={styles.subTitulo}>
        Direccion: {establesimiento.direccion}
      </Text>
      <Text style={styles.subTitulo}>Telefono: {establesimiento.telefono}</Text>

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
          onPress={deleteEstablesimientoAlert}
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
    marginBottom: 15,
    backgroundColor: "lightblue",
  },
  titulo: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  subTitulo: {
    paddingBottom: 5,
  },
});
