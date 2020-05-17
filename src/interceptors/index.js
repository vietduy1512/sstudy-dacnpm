import axios from 'axios';
import {REACT_APP_API_ENDPOINT} from 'react-native-dotenv';

axios.defaults.baseURL =
  REACT_APP_API_ENDPOINT || 'https://dacnpm2020-backend.herokuapp.com/';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

// TODO
// axios.interceptors.request
// axios.interceptors.response
