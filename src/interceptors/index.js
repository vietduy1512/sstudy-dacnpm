import axios from 'axios';
import {REACT_APP_API_ENDPOINT} from 'react-native-dotenv';

axios.defaults.baseURL = REACT_APP_API_ENDPOINT || 'http://192.168.0.110:8080';
axios.defaults.withCredentials = true;

// TODO
// axios.interceptors.request

// axios.interceptors.response
