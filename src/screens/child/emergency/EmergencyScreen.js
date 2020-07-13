/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {DEVICE_TOKEN} from 'constants/async-storage';

const EmergencyScreen = () => {
  const sendMessage = async () => {
    try {
      let deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
      await axios.post('/notification/sendEmergencyMessage', {
        time: Date.now(),
        deviceToken: deviceToken,
      });
      Alert.alert('Send message successfully');
    } catch (error) {
      Alert.alert('Failed to send notification to child');
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
