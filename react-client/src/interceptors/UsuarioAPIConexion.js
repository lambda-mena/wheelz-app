import axios from 'axios';

export const getUser = (data)=>{

    return axios.get(`https://devps-production.up.railway.app/api/usuario/${data}`)
                .then(response => response.data)
                .catch(error => console.error('Error fetching data:', error));

}

export const putUser = (data)=>{

    const id = data.id;

    return axios.put(`http://charming-amazement-production.up.railway.app/api/usuario/${id}`, data)
                .then(response => console.log(response.data))
                .catch(error => console.error('Error updating data:', error));
}

export const patchUser = (data)=>{
    
    const id = data.id;

    return axios.patch(`http://charming-amazement-production.up.railway.app/api/usuario/${id}`, data)
                .then(response => console.log(response.data))
                .catch(error => console.error('Error updating data:', error));

}

export const postUser = (data)=>{    

    return axios.post(`http://charming-amazement-production.up.railway.app/api/usuario`, data)
                .then(response => response.data)
                .catch(error => console.error('Error posting data:', error));

}

export const postLoginUser = (data)=>{

    const request = {
        "email": data.email,
        "contraseña": data.pass
      }

    return axios.post(`https://devps-production.up.railway.app/api/usuario/login`, request)
                .then(response => response.data)
                .catch(error => console.error('Error posting data:', error));

}

export const getAllUsers = async () => {
    return await axios.get(`https://devps-production.up.railway.app/api/usuario/all`);
  }