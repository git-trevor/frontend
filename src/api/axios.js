import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:3000/medipet',
    baseURL: 'https://medipet-r3og.onrender.com/medipet',
    withCredentials: true,
    headers:{
        Accept: 'aplication/json'
    }
});

export default instance;