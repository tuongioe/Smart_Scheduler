import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

export default customAxios;
