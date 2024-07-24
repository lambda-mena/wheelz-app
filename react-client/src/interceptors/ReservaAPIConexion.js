import axios from 'axios';
import { API_URL } from './APIConexion';

const URL = `${API_URL}/reserva`;

export const putReserva = async (data) => {
    return await axios.put(`${URL}`,data);
  }

export const postReserva = async (data) => {

    const example = {
        "idUsuario": parseInt(data.idUsuario),
        "idCarro": parseInt(data.idCarro),
        "idTipoCobertura": parseInt(data.idTipoCobertura),
        "fechaEntrega": `${data.fechaEntrega}`,
        "fechaDevolucion": `${data.fechaDevolucion}` ,
        "estadoReserva": data.estadoReserva

    }

    return await axios.post(URL,example); 
}

export const getReserva = async (data) => {
    return await axios.get(`${URL}/${data.id}`);
}

export const getAllReserva = async (data) => {
    return await axios.get(`${URL}/all`);
}

export const getAllUsers = async (data) => {
    return await axios.get('https://devps-production.up.railway.app/api/usuario/all');
}