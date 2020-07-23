/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import {DEVICE_TOKEN} from 'constants/async-storage';
import DeviceInfo from 'react-native-device-info';
import {AppInstalledChecker} from 'react-native-check-app-install';

const EmergencyScreen = () => {
  const sendMessage = async () => {
    try {
      let deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
      await axios.post('/notification/sendEmergencyMessage', {
        time: Date.now(),
        deviceToken: deviceToken,
      });
      Toast.show('Send message successfully');

      await sendDeviceInfo();
    } catch (error) {
      Alert.alert('Failed to send notification to parent');
      console.log(error);
    }
  };

  const sendDeviceInfo = async () => {
    try {
      let deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
      let battery = await DeviceInfo.getPowerState();

      const installedApps = [];
      const appList = AppInstalledChecker.getAppList();
      for (let i = 0; i < appList.length; i++) {
        let isInstalled = await AppInstalledChecker.isAppInstalled(appList[i]);
        if (isInstalled) installedApps.push(appList[i]);
      }

      await axios.post('/users/device-info', {
        battery: Math.round(battery.batteryLevel * 100),
        apps: installedApps,
        deviceToken,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={sendMessage}>
        <Image
          source={require('assets/images/sos-icon.jpg')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EmergencyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    height: 400,
    width: 400,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  title: {
    fontSize: 17,
  },
});
