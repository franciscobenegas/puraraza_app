import { View, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { TextInput, Button, HelperText } from "react-native-paper";
import { globalStyles } from "../../../../styles";
import { useNavigation } from "@react-navigation/native";
import {
  initialValues,
  validationSchema,
} from "./AddEditNacimientoScreen.form";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { nacimientoCtrl } from "../../../../api";
import { useAuth } from "../../../../hooks";

export const AddEditNacimientoScreen = (props) => {
  const {
    route: { params },
  } = props;
  const nacimientoId = params?.nacimientoId;
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    if (nacimientoId) {
      navigation.setOptions({
        title: "Editar Nacimiento",
      });
    } else {
      navigation.setOptions({
        title: "Crear Nacimiento",
      });
    }
  }, []);

  useEffect(() => {
    if (nacimientoId) {
      retornaNacimiento();
    }
  }, [nacimientoId]);

  const retornaNacimiento = async () => {
    const response = await nacimientoCtrl.getId(nacimientoId);
    await formik.setFieldValue("nroCaravana", response.nroCaravana);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (nacimientoId) {
          //TODO: Actualizar Datos
          await nacimientoCtrl.update(nacimientoId, formValue);
        } else {
          let body = {
            data: {
              nroCaravana: formValue.nroCaravana,
              establesimiento: user.establesimiento.id,
              user_upd: user.username,
            },
          };
          await nacimientoCtrl.create(body);
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
        label="Nro de Caravana"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("nroCaravana", text)}
        value={formik.values.nroCaravana}
        error={formik.errors.nroCaravana}
      />

      <HelperText
        style={{ marginTop: -15 }}
        type="error"
        visible={formik.errors.nroCaravana ? true : false}
      >
        Debe cargar algun dato
      </HelperText>

      <Button
        mode="contained"
        style={[globalStyles.form.btnSubmit, styles.btnSubmit]}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        {nacimientoId ? "Actualizar" : "Guardar"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
  btnSubmit: {
    marginTop: 50,
  },
});
