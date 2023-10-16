import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { motivoEntradaCtrl } from "../../../../../api";
import Toast from "react-native-root-toast";

export function MotivoEntrada(props) {
  const { motivoEntrada, motivoEntradaId, onReload } = props;
  const navigation = useNavigation();
  const goToUpdate = () => {
    navigation.navigate("AddEditMotivoEntrada", { motivoEntradaId });
  };

  const deleteMotivoEntradaAlert = () => {
    Alert.alert(
      `Eliminar ${motivoEntrada.nombre}`,
      "Estas seguro de que deseas elimanr este Dato!!!",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: deleteMotivoEntrada,
        },
      ],
      { canselable: false }
    );
  };
  const deleteMotivoEntrada = async () => {
    try {
      await motivoEntradaCtrl.delete(motivoEntradaId);
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
      <Text style={styles.titulo}>{motivoEntrada.nombre}</Text>
      <Text>Usuario : {motivoEntrada.user_upd}</Text>
      <Text>{motivoEntrada.updatedAt}</Text>
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
          onPress={deleteMotivoEntradaAlert}
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
