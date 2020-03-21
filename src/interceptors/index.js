import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.withCredentials = true;

// TODO
// axios.interceptors.request

// axios.interceptors.response