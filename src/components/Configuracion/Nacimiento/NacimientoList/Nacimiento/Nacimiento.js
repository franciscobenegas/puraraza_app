import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { nacimientoCtrl, clasificacionCtrl } from "../../../../../api";
import Toast from "react-native-root-toast";
import { DateTime } from "luxon";

export const Nacimiento = (props) => {
  const { nacimiento, nacimientoId, clasificacionMenor, onReload } = props;
  const navigation = useNavigation();
  const goToUpdate = () => {
    navigation.navigate("AddEditNacimientoScreen", { nacimientoId });
  };

  const deleteNacimientoAlert = () => {
    Alert.alert(
      `Eliminar ${nacimiento.sexo}`,
      "Estas seguro de que deseas eliminar este Dato!!!",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: deleteNacimiento,
        },
      ],
      { canselable: false }
    );
  };

  const retornaClasificacion = async (IdCla) => {
    const response = await clasificacionCtrl.getId(IdCla);
    return response.stock;
  };

  const deleteNacimiento = async () => {
    try {
      await nacimientoCtrl.delete(nacimientoId);
      try {
        let resultData = clasificacionMenor.filter((item) =>
          item.attributes.nombre
            .toLowerCase()
            .match(nacimiento.sexo.toLowerCase())
        );

        const stockVer = await retornaClasificacion(resultData[0].id);

        let bodyCla = {
          stock: parseInt(stockVer) - 1,
        };

        let idClasificacion = resultData[0]?.id;

        if (idClasificacion !== 0) {
          await clasificacionCtrl.update(idClasificacion, bodyCla);
        }
      } catch (error) {
        Toast.show("Error, no se pudo actualizar el Stock en Clasificacion", {
          position: Toast.positions.CENTER,
          duration: Toast.durations.LONG,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      }
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.titulo}>#Caravana : {nacimiento.nroCaravana}</Text>
        <Text style={styles.titulo}>Fecha: {nacimiento.fecha}</Text>
      </View>
      <Text>#Caravana Madre : {nacimiento.nroCaravanaMadre}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Peso: {nacimiento.peso} Kg.</Text>
        <Text>Sexo: {nacimiento.sexo}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Tipo Parto : {nacimiento.tipo_Parto}</Text>
        <Text>
          Tipo de Raza : {nacimiento.tipo_raza.data.attributes.nombre}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Usuario : {nacimiento.user_upd}</Text>
        <Text>
          {DateTime.fromISO(nacimiento.updatedAt).toFormat(
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
          onPress={deleteNacimientoAlert}
        >
          Eliminar
        </Button>
      </View>
    </View>
  );
};

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
