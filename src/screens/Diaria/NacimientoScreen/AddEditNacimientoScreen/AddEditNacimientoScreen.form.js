import * as Yup from "yup";

export function initialValues() {
  return {
    fecha: new Date().toISOString().slice(0, 10),
    peso: "",
    tipo_raza: "",
    sexo: "",
    tipo_Parto: "",
    nroCaravana: "",
    nroCaravanaMadre: "",
  };
}

export function validationSchema() {
  return Yup.object({
    fecha: Yup.date().required(true),
    //tipo_raza: Yup.string().required(true),
    //sexo: Yup.string().required(true),
    //tipo_Parto: Yup.string().required(true),
  });
}
