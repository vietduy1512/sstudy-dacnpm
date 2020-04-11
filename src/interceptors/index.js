import axios from 'axios';

axios.defaults.baseURL =
  process.env.REACT_APP_API_ENDPOINT || 'http://192.168.0.110:8080';
axios.defaults.withCredentials = true;

// TODO
// axios.interceptors.request

// axios.interceptors.response
