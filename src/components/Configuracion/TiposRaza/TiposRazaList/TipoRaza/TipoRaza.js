import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { tiposRazaCtrl } from "../../../../../api";
import Toast from "react-native-root-toast";
import { DateTime } from "luxon";

export function TipoRaza(props) {
  const { tipoRaza, tipoRazaId, onReload } = props;
  const navigation = useNavigation();

  const goToUpdate = () => {
    navigation.navigate("AddEditTipoRaza", { tipoRazaId });
  };

  const deleteTipoRazaAlert = () => {
    Alert.alert(
      `Eliminar ${tipoRaza.nombre}`,
      "Estas seguro de que deseas eliminar este Dato!!!",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: deleteTipoRaza,
        },
      ],
      { canselable: false }
    );
  };

  const deleteTipoRaza = async () => {
    try {
      await tiposRazaCtrl.delete(tipoRazaId);
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
      <Text style={styles.titulo}>{tipoRaza.nombre}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Usuario : {tipoRaza.user_upd}</Text>
        <Text>
          {DateTime.fromISO(tipoRaza.updatedAt).toFormat("dd/MM/yyyy HH':'mm")}
        </Text>
      </View>
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
          onPress={deleteTipoRazaAlert}
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
});
