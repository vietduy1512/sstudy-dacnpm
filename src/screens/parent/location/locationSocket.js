import {CHILD_LOCATION_RESPONSE} from 'constants/socket-events';
import socket from 'socketio';

const registerChildLocationResponseListener = () => {
  socket.on(CHILD_LOCATION_RESPONSE, data => {
    // TODO:
    console.log(data);
  });
};

export default registerChildLocationResponseListener;
