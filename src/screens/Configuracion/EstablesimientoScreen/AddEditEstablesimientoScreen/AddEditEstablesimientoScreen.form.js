import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    departamento: "",
    distrito: "",
    localidad: "",
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
    departamento: Yup.string().required(true),
    distrito: Yup.string().required(true),
    localidad: Yup.string().required(true),
  });
}
