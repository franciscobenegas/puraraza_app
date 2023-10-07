import { authFetch } from "../lib";
import { ENV } from "../utils";

async function getAllTiposRaza(establesimientoId) {
  try {
    const filters = `filters[establesimiento][id][$eq]=${establesimientoId}&populate=*&sort=createdAt:desc`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.TIPOS_RAZA}?${filters}`;
    const response = await authFetch(url);
    if (response.status !== 200) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function createTipoRaza(data) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.TIPOS_RAZA}`;
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

async function getTipoRazaById(tipoRazaId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.TIPOS_RAZA}/${tipoRazaId}`;
    const response = await authFetch(url);
    if (response.status !== 200) throw response;
    const result = await response.json();
    return { ...result.data.attributes, id: result.data.id };
  } catch (error) {
    throw error;
  }
}

async function updateTipoRaza(tipoRazaId, data) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.TIPOS_RAZA}/${tipoRazaId}`;
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

async function deleteTipoRaza(tipoRazaId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.TIPOS_RAZA}/${tipoRazaId}`;
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

export const tiposRazaCtrl = {
  getAll: getAllTiposRaza,
  getId: getTipoRazaById,
  create: createTipoRaza,
  update: updateTipoRaza,
  delete: deleteTipoRaza,
};
