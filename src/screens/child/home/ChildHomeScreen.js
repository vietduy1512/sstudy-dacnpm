/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {PARENT_ID, DEVICE_TOKEN} from 'constants/async-storage';
import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from 'react-native-device-info';
import {AUTHENTICATE_TOKEN} from 'constants';

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        initSession();
      } catch (error) {
        Alert.alert('Failed to init/save your current location');
        console.log(error);
      }
    });
    return unsubscribe;
  }, [navigation]);

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
      navigation.navigate(AUTHENTICATE_TOKEN);
    }
    // TODO handle deviceToken == null
  };

  const saveCurrentChildPosition = parentId => {
    Geolocation.getCurrentPosition(
      async position => {
        await axios.post('/location/saveChildLocation', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          parentId: parentId,
        });
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
