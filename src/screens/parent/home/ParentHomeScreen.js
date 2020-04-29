import React, {useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {CHILD_LOCATION_REQUEST} from 'constants/socket-events';
import socket from 'socketio';
import registerChildLocationResponseListener from '../location/locationSocket';

const HomeScreen = () => {
  useEffect(() => {
    registerChildLocationResponseListener();
  }, []);

  const sendSocketMessage = () => {
    socket.emit(CHILD_LOCATION_REQUEST);
  };

  return (
    <View style={styles.container}>
      <Button title="Send socket" onPress={sendSocketMessage} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
