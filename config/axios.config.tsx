import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://192.168.64.102:8000',
  withCredentials: true,
});

export default customAxios;
