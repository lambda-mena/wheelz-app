import axios from 'axios';

const URL = 'https://devps-production.up.railway.app/api/reserva/';

export const putReserva = async (data) => {
    return await axios.put(`${URL}`,data);
  }

export const postReserva = async (data) => {

    const request = {
        "idUsuario": parseInt(data.idUsuario),
        "idCarro": parseInt(data.idCarro),
        "idTipoCobertura": parseInt(data.idTipoCobertura),
        "fechaEntrega": `${data.fechaEntrega}:00.160Z`,
        "fechaDevolucion": `${data.fechaDevolucion}:00.160Z` ,
        "estadoReserva": data.estadoReserva
    }

    console.log(request);

    return await axios.post(`${URL}`,request , {
        headers: {
            'Content-Type': 'mmultipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*' ,
            'Access-Control-Allow-Origin': '*'
        },
    });
}

export const getReserva = async (data) => {
    return await axios.get(`${URL}${data.id}`);
}

export const getAllReserva = async (data) => {
    return await axios.get(`${URL}all`);
}