import { authFetch } from "../lib";
import { ENV } from "../utils";

async function getAll(establesimientoId) {
  try {
    const filters = `filters[establesimiento][id][$eq]=${establesimientoId}&populate=*&sort=createdAt:desc`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MOTIVO_SALIDA}?${filters}`;
    const response = await authFetch(url);
    if (response.status !== 200) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function createData(data) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MOTIVO_SALIDA}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await authFetch(url, params);
    if (response.status !== 200) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function getById(identificador) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MOTIVO_SALIDA}/${identificador}`;
    const response = await authFetch(url);
    if (response.status !== 200) throw response;
    const result = await response.json();
    return { ...result.data.attributes, id: result.data.id };
  } catch (error) {
    throw error;
  }
}

async function updateData(identificador, data) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MOTIVO_SALIDA}/${identificador}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    };
    const response = await authFetch(url, params);
    if (response.status !== 200) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function deleteData(identificador) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MOTIVO_SALIDA}/${identificador}`;
    const params = {
      method: "DELETE",
    };
    const response = await authFetch(url, params);
    if (response.status !== 200) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const motivoSalidaCtrl = {
  getAll: getAll,
  getId: getById,
  create: createData,
  update: updateData,
  delete: deleteData,
};
