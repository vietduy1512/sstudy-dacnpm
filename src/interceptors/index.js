import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080';
axios.defaults.withCredentials = true;

// TODO
// axios.interceptors.request

// axios.interceptors.response