import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { authCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { globalStyles } from "../../../styles";
import { initialValues, validationSchame } from "./LoginForm.form";

export function LoginForm(props) {
  const { showRegister } = props;
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(true);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchame(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { email, password } = formValue;
        const response = await authCtrl.login(email, password);
        login(response.jwt);
      } catch (error) {
        Toast.show("Usuario o contraseña incorrectos", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  const cambiarIcono = () => {
    setShowPass((prevState) => !prevState);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        label="Usuario o Email"
        style={globalStyles.form.input}
        autoCapitalize="none"
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <TextInput
        right={
          <TextInput.Icon
            icon={showPass ? "eye" : "eye-off"}
            onPress={cambiarIcono}
          />
        }
        label="Contraseña"
        style={globalStyles.form.input}
        autoCapitalize="none"
        secureTextEntry={showPass}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Button
        mode="contained"
        style={globalStyles.form.btnSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Iniciar
      </Button>

      <Button
        mode="text"
        style={globalStyles.form.btnText}
        labelStyle={globalStyles.form.btnTextLabel}
        onPress={showRegister}
      >
        Registrarse
      </Button>
    </View>
  );
}
