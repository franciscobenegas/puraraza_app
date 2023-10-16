import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { globalStyles } from "../../../../styles";
import { useNavigation } from "@react-navigation/native";
import {
  initialValues,
  validationSchema,
} from "./AddEditCausaMortandadScreen.form";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { causaMortandadCtrl } from "../../../../api";
import { useAuth } from "../../../../hooks";

export function AddEditCausaMortandadScreen(props) {
  const {
    route: { params },
  } = props;
  const causaMortandadId = params?.causaMortandadId;
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    if (causaMortandadId) {
      navigation.setOptions({
        title: "Editar Causa Mortandad",
      });
    } else {
      navigation.setOptions({
        title: "Crear Causa Mortandad",
      });
    }
  }, []);

  useEffect(() => {
    if (causaMortandadId) {
      retornaCausaMortandad();
    }
  }, [causaMortandadId]);

  const retornaCausaMortandad = async () => {
    const response = await causaMortandadCtrl.getId(causaMortandadId);
    await formik.setFieldValue("nombre", response.nombre);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (causaMortandadId) {
          //TODO: Actualizar Datos
          await causaMortandadCtrl.update(causaMortandadId, formValue);
        } else {
          let body = {
            data: {
              nombre: formValue.nombre,
              establesimiento: user.establesimiento.id,
              user_upd: user.username,
            },
          };
          await causaMortandadCtrl.create(body);
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
        label="Causa Mortandad"
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
        {causaMortandadId ? "Actualizar" : "Guardar"}
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