export const ENV = {
  // TODO: Localmente
  //API_URL: "http://192.168.56.1:1337/api",

  // TODO: Servidor en la Nube
  API_URL: "https://strapi-production-49f2.up.railway.app/api",
  ENDPOINTS: {
    REGISTER: "auth/local/register",
    LOGIN: "auth/local",
    USERS_ME: "users/me",
    USERS: "users",
    TIPOS_RAZA: "tipo-razas",
    CAUSA_MORTANDAD: "causa-mortandads",
    MOTIVO_PESAJE: "motivo-pesajes",
    MOTIVO_ENTRADA: "motivo-entradas",
    MOTIVO_SALIDA: "motivo-salidas",
    CLASIFICACION: "clasificacions",
    ESTABLESIMIENTO: "establesimientos",
    PROPIETARIO: "propietarios",
    POTRERO: "potreros",
    MORTANDAD: "mortandads",
    NACIMIENTO: "nacimientos",
  },
  STORAGE: {
    TOKEN: "token",
  },
};
