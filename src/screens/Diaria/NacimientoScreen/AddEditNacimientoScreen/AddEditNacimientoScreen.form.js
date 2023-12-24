import * as Yup from "yup";

export function initialValues() {
  return {
    nroCaravana: "",
  };
}

export function validationSchema() {
  return Yup.object({
    nroCaravana: Yup.string().required(true),
  });
}
