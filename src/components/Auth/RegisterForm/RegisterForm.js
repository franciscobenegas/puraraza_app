import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { globalStyles } from "../../../styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { authCtrl } from "../../../api/auth";
import Toast from "react-native-root-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function RegisterForm(props) {
  const { showLogin } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { email, username, password } = formValue;
        await authCtrl.register(email, username, password);
        showLogin();
      } catch (error) {
        Toast.show("Error al registar al usuario, intente mas tarde", {
          position: Toast.positions.CENTER,
          duration: Toast.durations.LONG,
          shadow: true,
          animation: true,
        });
      }
    },
  });
  return (
    <KeyboardAwareScrollView extraScrollHeight={10}>
      <View style={{ flex: 1, marginTop: "20%" }}>
        <TextInput
          label="Correo Electronico"
          style={globalStyles.form.input}
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("email", text)}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <TextInput
          label="Nombre Usuario"
          style={globalStyles.form.input}
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("username", text)}
          value={formik.values.username}
          error={formik.errors.username}
        />
        <TextInput
          label="Contraseña"
          style={globalStyles.form.input}
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <TextInput
          label="Repetir Contraseña"
          style={globalStyles.form.input}
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
        />

        <Button
          mode="contained"
          style={globalStyles.form.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
          Registrarse
        </Button>
        <Button
          mode="text"
          style={globalStyles.form.btnText}
          labelStyle={globalStyles.form.btnTextLabel}
          onPress={showLogin}
        >
          Iniciar Sesion
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
