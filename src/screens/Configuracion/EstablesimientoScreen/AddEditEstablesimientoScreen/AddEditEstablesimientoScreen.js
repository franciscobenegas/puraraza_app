import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
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

export function EditEstablesimientoScreen(props) {
  const {
    route: { params },
  } = props;
  const establesimientoId = params?.establesimientoId;
  const navigation = useNavigation();
  const { user } = useAuth();

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
    await formik.setFieldValue("ruc", response.ruc);
    await formik.setFieldValue("direccion", response.direccion);
    await formik.setFieldValue("telefono", response.telefono);
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

  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("nombre", text)}
        value={formik.values.nombre}
        error={formik.errors.nombre}
      />

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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
  btnSubmit: {
    marginTop: 50,
  },
  combo: {
    backgroundColor: "#E9E3F0",
    marginBottom: 20,
  },
});
