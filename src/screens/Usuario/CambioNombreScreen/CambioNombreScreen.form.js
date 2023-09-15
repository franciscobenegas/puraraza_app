import * as Yup from "yup";

export function initialValues(nombre, apellido) {
  return {
    nombre: nombre || "",
    apellido: apellido || "",
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(true),
    apellido: Yup.string().required(true),
  });
}
