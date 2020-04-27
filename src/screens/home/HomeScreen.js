import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {CHILD_LOCATION_REQUEST} from 'constants/socket-events';
import socket from '../../socketio';
import './homeSocket';

const HomeScreen = () => {
  const sendSocketMessage = () => {
    socket.emit(CHILD_LOCATION_REQUEST);
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.logo} source={require('assets/images/bg-1.jpg')} /> */}
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
