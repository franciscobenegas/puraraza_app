import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { clasificacionCtrl } from "../../../../../api";
import Toast from "react-native-root-toast";

export function Clasificacion(props) {
  const { clasificacion, clasificacionId, onReload } = props;
  const navigation = useNavigation();
  const goToUpdate = () => {
    navigation.navigate("AddEditClasificacion", { clasificacionId });
  };

  const deleteClasificacionAlert = () => {
    Alert.alert(
      `Eliminar ${clasificacion.nombre}`,
      "Estas seguro de que deseas eliminar este Dato!!!",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: deleteClasificacion,
        },
      ],
      { canselable: false }
    );
  };
  const deleteClasificacion = async () => {
    try {
      await clasificacionCtrl.delete(clasificacionId);
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
      <Text style={styles.titulo}>{clasificacion.nombre}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subTitulo}>Edad: {clasificacion.dosAnhos}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.subTitulo}>
            Cantidad:{" "}
            {Intl.NumberFormat("de-DE").format(Number(clasificacion.stock))}
          </Text>
        </View>
      </View>

      <Text style={styles.subTitulo}>
        Precio Estimado:{" "}
        {Intl.NumberFormat("de-DE").format(Number(clasificacion.precio))}
      </Text>

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
          onPress={deleteClasificacionAlert}
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
