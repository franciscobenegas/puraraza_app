import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { HelperText, TextInput, Button } from "react-native-paper";
import { globalStyles } from "../../../../styles";
import { useNavigation } from "@react-navigation/native";
import {
  initialValues,
  validationSchema,
} from "./AddEditClasificacionScreen.form";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { clasificacionCtrl } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { Picker } from "@react-native-picker/picker";

export function AddEditClasificacionScreen(props) {
  const {
    route: { params },
  } = props;
  const clasificacionId = params?.clasificacionId;
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    if (clasificacionId) {
      navigation.setOptions({
        title: "Editar Clasificaicon",
      });
    } else {
      navigation.setOptions({
        title: "Crear Clasificaicon",
      });
    }
  }, []);

  useEffect(() => {
    if (clasificacionId) {
      retornaClasificacion();
    }
  }, [clasificacionId]);

  const retornaClasificacion = async () => {
    const response = await clasificacionCtrl.getId(clasificacionId);
    await formik.setFieldValue("nombre", response.nombre);
    await formik.setFieldValue("dosAnhos", response.dosAnhos);
    await formik.setFieldValue("precio", response.precio);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (clasificacionId) {
          // TODO: Actualizar Datos
          await clasificacionCtrl.update(clasificacionId, formValue);
        } else {
          // TODO: Insertar Nuevo Registro
          let body = {
            data: {
              nombre: formValue.nombre,
              dosAnhos: formValue.dosAnhos ? formValue.dosAnhos : "Mayor",
              precio: formValue.precio === "" ? 0 : formValue.precio,
              stock: 0,
              establesimiento: user.establesimiento.id,
              user_upd: user.username,
            },
          };

          await clasificacionCtrl.create(body);
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
        label="Calsificacion"
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

      <Picker
        style={styles.combo}
        dropdownIconRippleColor="#1cb0f6"
        selectedValue={formik.values.dosAnhos}
        onValueChange={(itemValue) =>
          formik.setFieldValue("dosAnhos", itemValue)
        }
        mode="dialog"
        prompt="Selecione Edad"
      >
        <Picker.Item label="Mayor" value="Mayor" />
        <Picker.Item label="Menor" value="Menor" />
        <Picker.Item label="Recien Nacido" value="Recien Nacido" />
      </Picker>

      <TextInput
        label="Precio Estimado"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("precio", text)}
        value={formik.values.precio}
        error={formik.errors.precio}
        keyboardType="numeric"
      />

      <Button
        mode="contained"
        style={[globalStyles.form.btnSubmit, styles.btnSubmit]}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        {clasificacionId ? "Actualizar" : "Guardar"}
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
