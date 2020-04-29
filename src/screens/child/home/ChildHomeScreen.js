import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SAVE_PARENT_ADDRES_SESSION} from 'constants/socket-events';
import {PARENT_ADDRESS} from 'constants/async-storage';
import socket from 'socketio';
import registerChildLocationRequestListener from '../location/locationSocket';

const HomeScreen = () => {
  useEffect(() => {
    async function initSession() {
      socket.emit(
        SAVE_PARENT_ADDRES_SESSION,
        await AsyncStorage.getItem(PARENT_ADDRESS),
      );
    }
    initSession();
    registerChildLocationRequestListener();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('assets/images/bg-1.jpg')} />
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
