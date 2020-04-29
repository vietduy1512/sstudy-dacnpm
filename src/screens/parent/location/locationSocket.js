import {CHILD_LOCATION_RESPONSE} from 'constants/socket-events';
import socket from 'socketio';

const registerChildLocationResponseListener = () => {
  socket.on(CHILD_LOCATION_RESPONSE, data => {
    // TODO: add this data which get from child to your map
    console.log(data);
  });
};

export default registerChildLocationResponseListener;
