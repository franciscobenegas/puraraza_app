import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { globalStyles } from "../../../styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./CambioNombreScreen.form";
import Toast from "react-native-root-toast";

export function CambioNombreScreen() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log(formValue);
      } catch (error) {
        Toast.show("Error al actualizar los datos.", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  const infoError = (textError) => {
    Toast.show(textError, {
      position: Toast.positions.CENTER,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("nombre", text)}
        value={formik.values.nombre}
        error={formik.errors.nombre}
      />
      {formik.errors.nombre && infoError("El Nombre es obligatorio")}
      <TextInput
        label="Apellido"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("apellido", text)}
        value={formik.values.apellido}
        error={formik.errors.apellido}
      />
      {formik.errors.apellido && infoError("El Apellido es obligatorio")}
      <Button
        mode="contained"
        style={globalStyles.form.btnSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Guardar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
});
