import { View, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { globalStyles } from "../../../../styles";
import { useNavigation } from "@react-navigation/native";
import {
  initialValues,
  validationSchema,
} from "./AddEditEstablesimientoScreen.form";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { establesimientoCtrl } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { Picker } from "@react-native-picker/picker";
import { map } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function EditEstablesimientoScreen(props) {
  const {
    route: { params },
  } = props;
  const establesimientoId = params?.establesimientoId;
  const navigation = useNavigation();
  const { user } = useAuth();
  const Departamentos =
    require("../../../../../assets/data/departamento.json").sort();
  const Distritos = require("../../../../../assets/data/distritos.json");
  const Localidad = require("../../../../../assets/data/localidad.json");

  const [distrito_departemento, setDistrito_departemento] = useState([]);
  const [localidad_distrito, setLocalidad_distrito] = useState([]);

  useEffect(() => {
    if (establesimientoId) {
      navigation.setOptions({
        title: "Editar Establesimiento",
      });
    } else {
      navigation.setOptions({
        title: "Crear Establesimiento",
      });
    }
  }, []);

  useEffect(() => {
    if (establesimientoId) {
      retornaEstablesimiento();
    }
  }, [establesimientoId]);

  const retornaEstablesimiento = async () => {
    const response = await establesimientoCtrl.getId(establesimientoId);
    await formik.setFieldValue("nombre", response.nombre);
    await formik.setFieldValue("departamento", response.departamento);
    await formik.setFieldValue("distrito", response.distrito);
    await formik.setFieldValue("localidad", response.localidad);
    await formik.setFieldValue("ruc", response.ruc);
    await formik.setFieldValue("direccion", response.direccion);
    await formik.setFieldValue("telefono", response.telefono);

    let distritos_dep = Distritos.filter(
      (destritoItem) =>
        destritoItem.Descripcion_de_Departamento.trim() ===
        response.departamento.trim()
    );
    setDistrito_departemento(distritos_dep.sort());

    let localiad_dis = Localidad.filter(
      (localidadItem) =>
        localidadItem.Descripcion_de_Distrito.trim() ===
        response.distrito.trim()
    );
    setLocalidad_distrito(localiad_dis.sort());
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (establesimientoId) {
          //TODO: Actualizar Datos
          await establesimientoCtrl.update(establesimientoId, formValue);
        } else {
          let body = {
            data: {
              nombre: formValue.nombre,
              departamento: formValue.departamento,
              distrito: formValue.distrito,
              localidad: formValue.localidad,
              ruc: formValue.ruc,
              direccion: formValue.direccion,
              telefono: formValue.telefono,
              establesimiento: user.establesimiento.id,
              user_upd: user.username,
            },
          };

          await establesimientoCtrl.create(body);
        }
        navigation.goBack();
      } catch (error) {
        Toast.show("Error al Editar o Actualizar el dato", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  const SelDespartemanto = (itemValue) => {
    formik.setFieldValue("departamento", itemValue);
    let distritos_dep = Distritos.filter(
      (destritoItem) => destritoItem.Descripcion_de_Departamento === itemValue
    );
    setDistrito_departemento(distritos_dep.sort());
  };

  const SelDistrito = (itemValue) => {
    formik.setFieldValue("distrito", itemValue);
    let localiad_dis = Localidad.filter(
      (localidadItem) =>
        localidadItem.Descripcion_de_Distrito.trim() === itemValue.trim()
    );
    setLocalidad_distrito(localiad_dis.sort());
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={10}>
      <View style={styles.container}>
        <TextInput
          label="Nombre"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("nombre", text)}
          value={formik.values.nombre}
          error={formik.errors.nombre}
        />
        <Text style={styles.textoCombo}>Seleccione Departamento</Text>
        <Picker
          style={styles.combo}
          dropdownIconRippleColor="#1cb0f6"
          selectedValue={formik.values.departamento}
          onValueChange={SelDespartemanto}
          mode="dialog"
          prompt="Selecione Departamento"
        >
          {map(Departamentos, (item, index) => (
            <Picker.Item
              key={index}
              label={item.descripcion_dpto}
              value={item.descripcion_dpto}
            />
          ))}
        </Picker>

        <Text style={styles.textoCombo}>Seleccione Distrito</Text>
        <Picker
          style={styles.combo}
          dropdownIconRippleColor="#1cb0f6"
          selectedValue={formik.values.distrito}
          onValueChange={SelDistrito}
          mode="dialog"
          prompt="Selecione Distrito"
        >
          {map(distrito_departemento, (item, index) => (
            <Picker.Item
              key={index}
              label={item.Descripcion_de_Distrito}
              value={item.Descripcion_de_Distrito}
            />
          ))}
        </Picker>

        <Text style={styles.textoCombo}>Seleccione Localidad</Text>
        <Picker
          style={styles.combo}
          dropdownIconRippleColor="#1cb0f6"
          selectedValue={formik.values.localidad}
          onValueChange={(itemValue) =>
            formik.setFieldValue("localidad", itemValue)
          }
          mode="dialog"
          prompt="Selecione Localidad"
        >
          {map(localidad_distrito, (item, index) => (
            <Picker.Item
              key={index}
              label={item.Descripcion_de_Barrio_Localidad}
              value={item.Descripcion_de_Barrio_Localidad}
            />
          ))}
        </Picker>

        <TextInput
          label="RUC"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("ruc", text)}
          value={formik.values.ruc}
          error={formik.errors.ruc}
        />

        <TextInput
          label="Direccion"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("direccion", text)}
          value={formik.values.direccion}
          error={formik.errors.direccion}
        />

        <TextInput
          label="Telefono"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("telefono", text)}
          value={formik.values.telefono}
          error={formik.errors.telefono}
        />

        <Button
          mode="contained"
          style={[globalStyles.form.btnSubmit, styles.btnSubmit]}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
          {establesimientoId ? "Actualizar" : "Guardar"}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginTop: 10,
  },
  btnSubmit: {
    marginTop: 20,
    marginBottom: 20,
  },
  combo: {
    backgroundColor: "#E9E3F0",
    marginBottom: 20,
  },
  textoCombo: {
    marginLeft: 15,
    //marginTop: -10,
  },
});
