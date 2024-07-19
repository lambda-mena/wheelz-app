import axios from 'axios';

export const getUser = (data)=>{
    
    const id = data.id;

    axios.get(`http://charming-amazement-production.up.railway.app/api/usuario/${id}`).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });

}

export const putUser = (data)=>{

    const id = data.id;

    axios.put(`http://charming-amazement-production.up.railway.app/api/usuario/${id}`, data).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.error('Error updating data:', error);
    });
}

export const patchUser = (data)=>{
    
    const id = data.id;

    axios.patch(`http://charming-amazement-production.up.railway.app/api/usuario/${id}`, data).then(response => {
    console.log(response.data);
  }).catch(error => {
    console.error('Error updating data:', error);
  });

}

export const postUser = (data)=>{
    axios.post(`http://charming-amazement-production.up.railway.app/api/usuario`, data).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.error('Error posting data:', error);
      });

}

export const postLoginUser = (data)=>{
    axios.post(`http://charming-amazement-production.up.railway.app/api/usuario/login`, data).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.error('Error posting data:', error);
      });

}

export const getAllUsers = ()=>{

    axios.get(`http://charming-amazement-production.up.railway.app/api/usuario/all`).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });

}