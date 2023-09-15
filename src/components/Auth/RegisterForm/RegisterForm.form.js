import { useFormik } from "formik";
import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email(true).required(true),
    username: Yup.string().required(true),
    password: Yup.string().required(true).min(6, true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  });
}
