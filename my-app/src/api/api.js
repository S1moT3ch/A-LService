import axios from 'axios';

const API = axios.create({
  baseURL: 'localhost:3000',
});

export default API;