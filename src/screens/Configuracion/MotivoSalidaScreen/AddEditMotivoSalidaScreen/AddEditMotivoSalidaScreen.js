import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { globalStyles } from "../../../../styles";
import { useNavigation } from "@react-navigation/native";
import {
  initialValues,
  validationSchema,
} from "./AddEditMotivoSalidaScreen.form";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { motivoSalidaCtrl } from "../../../../api";
import { useAuth } from "../../../../hooks";

export function AddEditMotivoSalidaScreen(props) {
  const {
    route: { params },
  } = props;
  const motivoSalidaId = params?.motivoSalidaId;
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    if (motivoSalidaId) {
      navigation.setOptions({
        title: "Editar Motivo Salida",
      });
    } else {
      navigation.setOptions({
        title: "Crear Motivo Salida",
      });
    }
  }, []);

  useEffect(() => {
    if (motivoSalidaId) {
      retornaMotivoSalida();
    }
  }, [motivoSalidaId]);

  const retornaMotivoSalida = async () => {
    const response = await motivoSalidaCtrl.getId(motivoSalidaId);
    await formik.setFieldValue("nombre", response.nombre);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (motivoSalidaId) {
          //TODO: Actualizar Datos
          await motivoSalidaCtrl.update(motivoSalidaId, formValue);
        } else {
          let body = {
            data: {
              nombre: formValue.nombre,
              establesimiento: user.establesimiento.id,
              user_upd: user.username,
            },
          };
          await motivoSalidaCtrl.create(body);
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
        label="Motivo Salida"
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
        {motivoSalidaId ? "Actualizar" : "Guardar"}
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
