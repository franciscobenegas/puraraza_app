import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { TextInput, Button, HelperText } from "react-native-paper";
import { globalStyles } from "../../../../styles";
import { useNavigation } from "@react-navigation/native";
import { initialValues, validationSchema } from "./AddEditPotreroScreen.form";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { potreroCtrl } from "../../../../api";
import { useAuth } from "../../../../hooks";

export function AddEditPotreroScreen(props) {
  const {
    route: { params },
  } = props;
  const potreroId = params?.potreroId;
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    if (potreroId) {
      navigation.setOptions({
        title: "Editar Potrero o Zona",
      });
    } else {
      navigation.setOptions({
        title: "Crear Potrero o Zona",
      });
    }
  }, []);

  useEffect(() => {
    if (potreroId) {
      retornaPotrero();
    }
  }, [potreroId]);

  const retornaPotrero = async () => {
    const response = await potreroCtrl.getId(potreroId);
    await formik.setFieldValue("nombre", response.nombre);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (potreroId) {
          //TODO: Actualizar Datos
          await potreroCtrl.update(potreroId, formValue);
        } else {
          let body = {
            data: {
              nombre: formValue.nombre,
              establesimiento: user.establesimiento.id,
              user_upd: user.username,
            },
          };
          await potreroCtrl.create(body);
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
        label="Potrero o Zona"
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
        {potreroId ? "Actualizar" : "Guardar"}
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
