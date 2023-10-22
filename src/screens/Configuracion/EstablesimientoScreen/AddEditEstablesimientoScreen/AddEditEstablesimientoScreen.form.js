import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    ruc: "",
    direccion: "",
    telefono: "",
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(true),
    direccion: Yup.string().required(true),
    telefono: Yup.string().required(true),
  });
}
