import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://192.168.56.1:8000',
  withCredentials: true,
  timeout: 10000,
});

export default customAxios;
