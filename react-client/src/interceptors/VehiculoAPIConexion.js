import axios from 'axios';

const baseUrl = 'https://devps-production.up.railway.app/api';

export const putVehicle = async (data) => {
  const payload = { ...data };
  delete payload.id;
  return await axios.put(`${baseUrl}/carros/${data.id}`, payload);
}

export const patchVehicle = async (id) => {
  return await axios.patch(`${baseUrl}/carros/${id}`);
}

export const postVehicle = async (data) => {
  console.log(data);
  return await axios.post(`${baseUrl}/carros`, data);
}

export const getAllVehicles = async () => {
  return await axios.get('https://devps-production.up.railway.app/api/carros/all');
}