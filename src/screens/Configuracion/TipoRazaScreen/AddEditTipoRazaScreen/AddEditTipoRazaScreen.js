import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Button, HelperText } from "react-native-paper";
import { globalStyles } from "../../../../styles";
import { useNavigation } from "@react-navigation/native";
import { initialValues, validationSchema } from "./AddEditTipoRazaScreen.form";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { tiposRazaCtrl } from "../../../../api";
import { useAuth } from "../../../../hooks";

export function AddEditTipoRazaScreen(props) {
  const {
    route: { params },
  } = props;
  const tipoRazaId = params?.tipoRazaId;
  const navigation = useNavigation();
  const { user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  useEffect(() => {
    if (tipoRazaId) {
      navigation.setOptions({
        title: "Editar Tipo de Raza",
      });
    } else {
      navigation.setOptions({
        title: "Crear Tipo de Raza",
      });
    }
  }, []);

  useEffect(() => {
    if (tipoRazaId) {
      retornaTipoRaza();
    }
  }, [tipoRazaId]);

  const retornaTipoRaza = async () => {
    const response = await tiposRazaCtrl.getId(tipoRazaId);
    await formik.setFieldValue("nombre", response.nombre);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (tipoRazaId) {
          //TODO: Actualizar Datos
          await tiposRazaCtrl.update(tipoRazaId, formValue);
        } else {
          let body = {
            data: {
              nombre: formValue.nombre,
              establesimiento: user.establesimiento.id,
              user_upd: user.username,
            },
          };
          await tiposRazaCtrl.create(body);
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
        label="Tipo de Raza"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("nombre", text)}
        value={formik.values.nombre}
        error={formik.errors.nombre}
      />

      <HelperText
        style={{ marginTop: -15 }}
        type="error"
        visible={formik.errors.nombre ? true : false}
      >
        Debe cargar algun dato
      </HelperText>

      <Button
        mode="contained"
        style={[globalStyles.form.btnSubmit, styles.btnSubmit]}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        {tipoRazaId ? "Actualizar" : "Guardar"}
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
  },
});
