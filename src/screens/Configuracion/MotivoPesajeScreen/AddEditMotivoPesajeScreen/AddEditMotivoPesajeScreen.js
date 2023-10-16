import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { globalStyles } from "../../../../styles";
import { useNavigation } from "@react-navigation/native";
import {
  initialValues,
  validationSchema,
} from "./AddEditMotivoPesajeScreen.form";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { motivoPesajeCtrl } from "../../../../api";
import { useAuth } from "../../../../hooks";

export function AddEditMotivoPesajeScreen(props) {
  const {
    route: { params },
  } = props;
  const motivoPesajeId = params?.motivoPesajeId;
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    if (motivoPesajeId) {
      navigation.setOptions({
        title: "Editar Motivo Pesaje",
      });
    } else {
      navigation.setOptions({
        title: "Crear Motivo Pesaje",
      });
    }
  }, []);

  useEffect(() => {
    if (motivoPesajeId) {
      retornaMotivoPesaje();
    }
  }, [motivoPesajeId]);

  const retornaMotivoPesaje = async () => {
    const response = await motivoPesajeCtrl.getId(motivoPesajeId);
    await formik.setFieldValue("nombre", response.nombre);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (motivoPesajeId) {
          //TODO: Actualizar Datos
          await motivoPesajeCtrl.update(motivoPesajeId, formValue);
        } else {
          let body = {
            data: {
              nombre: formValue.nombre,
              establesimiento: user.establesimiento.id,
              user_upd: user.username,
            },
          };
          await motivoPesajeCtrl.create(body);
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
        label="Motivo Pesaje"
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
        {motivoPesajeId ? "Actualizar" : "Guardar"}
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