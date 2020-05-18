import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {PARENT_ID, DEVICE_TOKEN} from 'constants/async-storage';
import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from 'react-native-device-info';
import {AUTHENTICATE_TOKEN} from 'constants';

const HomeScreen = props => {
  useEffect(() => {
    initSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initSession = async () => {
    // TODO: implement background task to update location
    let parentId = parseInt(await AsyncStorage.getItem(PARENT_ID), 10);
    let deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
    if (parentId) {
      await axios.post('/users/initChild', {
        parentId: parentId,
        deviceToken: deviceToken,
      });
      saveCurrentChildPosition(parentId);
    } else {
      props.navigation.navigate(AUTHENTICATE_TOKEN);
    }
    // TODO handle deviceToken == null
  };

  const saveCurrentChildPosition = parentId => {
    Geolocation.getCurrentPosition(
      async position => {
        let response = await axios.post('/location/saveChildLocation', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          parentId: parentId,
        });
        if (response.status !== 200) {
          Alert.alert('Failed to save your current location');
        }
      },
      async error => console.log(error),
      {
        enableHighAccuracy: DeviceInfo.isEmulatorSync() ? true : false,
        timeout: 2000,
        maximumAge: 1000,
      },
    );
  };

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
  },
  logo: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
