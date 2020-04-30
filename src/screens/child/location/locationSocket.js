import {
  CHILD_LOCATION_REQUEST,
  CHILD_LOCATION_RESPONSE,
} from 'constants/socket-events';
import socket from 'socketio';
import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from 'react-native-device-info';

const registerChildLocationRequestListener = () => {
  socket.on(CHILD_LOCATION_REQUEST, () => {
    Geolocation.getCurrentPosition(
      position => {
        socket.emit(CHILD_LOCATION_RESPONSE, position);
      },
      error => {
        socket.emit(CHILD_LOCATION_RESPONSE, error);
      },
      {
        enableHighAccuracy: DeviceInfo.isEmulatorSync() ? true : false,
        timeout: 2000,
        maximumAge: 1000,
      },
    );
  });
};

export default registerChildLocationRequestListener;
