import io from 'socket.io-client';
import {REACT_APP_API_ENDPOINT} from 'react-native-dotenv';

export default io.connect(
  REACT_APP_API_ENDPOINT || 'http://192.168.0.110:8080',
);
