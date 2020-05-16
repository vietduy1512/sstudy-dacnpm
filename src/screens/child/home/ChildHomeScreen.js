import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {PARENT_ADDRESS} from 'constants/async-storage';
import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from 'react-native-device-info';

const HomeScreen = () => {
  useEffect(() => {
    initSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initSession = async () => {
    // TODO: implement background task to update location
    let parentAddress = await AsyncStorage.getItem(PARENT_ADDRESS);
    if (parentAddress) {
      await axios
        .post('/users/initChild', {
          parentEmailAddress: parentAddress,
        })
        .then(() => {
          saveCurrentChildPosition(parentAddress);
        });
    } else {
      // TODO: Force user to input OTP
    }
  };

  const saveCurrentChildPosition = parentAddress => {
    Geolocation.getCurrentPosition(
      async position => {
        let response = await axios.post('/location/saveChildLocation', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          parentEmailAddress: parentAddress,
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
