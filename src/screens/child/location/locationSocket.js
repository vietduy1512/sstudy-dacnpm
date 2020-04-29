import {
  CHILD_LOCATION_REQUEST,
  CHILD_LOCATION_RESPONSE,
} from 'constants/socket-events';
import socket from 'socketio';

const registerChildLocationRequestListener = () => {
  socket.on(CHILD_LOCATION_REQUEST, () => {
    // TODO: get your child location using geo
    socket.emit(CHILD_LOCATION_RESPONSE, {
      msg: 'Child location',
      latitude: 0,
      longitude: 0,
    });
  });
};

export default registerChildLocationRequestListener;
