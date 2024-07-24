import axios from 'axios';
import { API_URL } from './APIConexion';

const URL = `${API_URL}/tipocobertura/`

export const getAllCoverturas = async () => {
    return await axios.get(`${URL}all`);
  }
