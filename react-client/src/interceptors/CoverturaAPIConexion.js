import axios from 'axios';

const URL = 'https://devps-production.up.railway.app/api/tipocobertura/'

export const getAllCoverturas = async () => {
    return await axios.get(`${URL}all`);
  }
