import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { motivoPesajeCtrl } from "../../../../../api";
import Toast from "react-native-root-toast";
import { DateTime } from "luxon";

export function MotivoPesaje(props) {
  const { motivoPesaje, motivoPesajeId, onReload } = props;
  const navigation = useNavigation();

  const goToUpdate = () => {
    navigation.navigate("AddEditMotivoPesaje", { motivoPesajeId });
  };

  const deleteMotivoPesajeAlert = () => {
    Alert.alert(
      `Eliminar ${motivoPesaje.nombre}`,
      "Estas seguro de que deseas elimanr este Dato!!!",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: deleteMotivoPesaje,
        },
      ],
      { canselable: false }
    );
  };

  const deleteMotivoPesaje = async () => {
    try {
      await motivoPesajeCtrl.delete(motivoPesajeId);
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
      <Text style={styles.titulo}>{motivoPesaje.nombre}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Usuario : {motivoPesaje.user_upd}</Text>
        <Text>
          {DateTime.fromISO(motivoPesaje.updatedAt).toFormat(
            "dd/MM/yyyy HH':'mm"
          )}
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
          onPress={deleteMotivoPesajeAlert}
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
