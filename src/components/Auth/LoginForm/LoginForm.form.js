import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchame() {
  return Yup.object({
    email: Yup.string().required(true),
    password: Yup.string().required(true).min(6, true).max(20, true),
  });
}
