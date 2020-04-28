import {SAVE_PARENT_ADDRES_SESSION} from 'constants/socket-events';
import socket from 'socketio';

socket.on(SAVE_PARENT_ADDRES_SESSION, () => {
  socket.emit(SAVE_PARENT_ADDRES_SESSION, {
    msg: 'Child location',
    latitude: 0,
    longitude: 0,
  });
});
