import axios from 'axios';
import { API_URL } from './APIConexion';

export const putVehicle = async (data) => {
  const payload = { ...data };
  delete payload.id;
  return await axios.put(`${API_URL}/carros/${data.id}`, payload);
}

export const patchVehicle = async (id) => {
  return await axios.patch(`${API_URL}/carros/${id}`);
}

export const postVehicle = async (data) => {
  console.log(data);
  return await axios.post(`${API_URL}/carros`, data);
}

export const getAllVehicles = async () => {
  return await axios.get(`${API_URL}/carros/all`);
}