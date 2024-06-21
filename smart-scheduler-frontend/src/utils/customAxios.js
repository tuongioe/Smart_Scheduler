import axios from 'axios';

const customAxios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default customAxios;
