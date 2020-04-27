import {
  CHILD_LOCATION_REQUEST,
  CHILD_LOCATION_RESPONSE,
} from 'constants/socket-events';
import socket from 'socketio';

socket.on(CHILD_LOCATION_REQUEST, () => {
  socket.emit(CHILD_LOCATION_RESPONSE, {
    msg: 'Child location',
    latitude: 0,
    longitude: 0,
  });
});

socket.on(CHILD_LOCATION_RESPONSE, data => {
  console.log(data);
});
