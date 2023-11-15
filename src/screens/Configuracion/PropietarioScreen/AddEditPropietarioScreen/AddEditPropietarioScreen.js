import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { globalStyles } from "../../../../styles";
import { useNavigation } from "@react-navigation/native";
import {
  initialValues,
  validationSchema,
} from "./AddEditPropietarioScreen.form";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { propietarioCtrl } from "../../../../api";
import { useAuth } from "../../../../hooks";

export function AddEditPropietarioScreen(props) {
  const {
    route: { params },
  } = props;
  const propietarioId = params?.propietarioId;
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    if (propietarioId) {
      navigation.setOptions({
        title: "Editar Propietario",
      });
    } else {
      navigation.setOptions({
        title: "Crear Propietario",
      });
    }
  }, []);

  useEffect(() => {
    if (propietarioId) {
      retornaPropietario();
    }
  }, [propietarioId]);

  const retornaPropietario = async () => {
    const response = await propietarioCtrl.getId(propietarioId);
    await formik.setFieldValue("nombre", response.nombre);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (propietarioId) {
          //TODO: Actualizar Datos
          await propietarioCtrl.update(propietarioId, formValue);
        } else {
          let body = {
            data: {
              nombre: formValue.nombre,
              establesimiento: user.establesimiento.id,
              user_upd: user.username,
            },
          };
          await propietarioCtrl.create(body);
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
        label="Propietario"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("nombre", text)}
        value={formik.values.nombre}
        error={formik.errors.nombre}
      />
      <Button
        mode="contained"
        style={[globalStyles.form.btnSubmit, styles.btnSubmit]}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        {propietarioId ? "Actualizar" : "Guardar"}
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
});
