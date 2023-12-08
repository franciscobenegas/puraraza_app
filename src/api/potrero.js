import { authFetch } from "../lib";
import { ENV } from "../utils";

async function getAll(establesimientoId) {
  try {
    const filters = `filters[establesimiento][id][$eq]=${establesimientoId}&populate=*&sort=createdAt:desc`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POTRERO}?${filters}`;
    const response = await authFetch(url);
    if (response.status !== 200) throw response;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function createPotrero(data) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POTRERO}`;
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

async function getPotreroById(potreroId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POTRERO}/${potreroId}`;
    const response = await authFetch(url);
    if (response.status !== 200) throw response;
    const result = await response.json();
    return { ...result.data.attributes, id: result.data.id };
  } catch (error) {
    throw error;
  }
}

async function updatePotrero(potreroId, data) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POTRERO}/${potreroId}`;
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

async function deletePotrero(potreroId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POTRERO}/${potreroId}`;
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

export const potreroCtrl = {
  getAll: getAll,
  getId: getPotreroById,
  create: createPotrero,
  update: updatePotrero,
  delete: deletePotrero,
};
