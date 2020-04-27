import React from 'react';
import {View, StyleSheet, Image, Button} from 'react-native';
import io from 'socket.io-client';

const HomeScreen = () => {
  const socket = io.connect('http://192.168.0.110:8080');

  const sendSocketMessage = () => {
    socket.emit('send-child-location', {
      msg: 'Child location',
      latitude: 0,
      longitude: 0,
    });
  }

  socket.on('get-child-location', data => {
    console.log(data);
  });

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
