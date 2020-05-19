import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';
import axios from 'axios';
import PushNotification from 'react-native-push-notification';

const ChildNotificationScreen = () => {
  const localNotification = () => {
    PushNotification.localNotification({
      foreground: false,
      userInteraction: false,
      title: 'Local Notification',
      message: 'Hello world',
      data: {},
    });
  };

  const sendNotificationToChild = async () => {
    try {
      await axios.post('/notification/sendNotificationToChild', {
        content: 'Hello from parent',
      });
    } catch (error) {
      Alert.alert('Failed to send notification to child');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Local Notification" onPress={localNotification} />
      <Button
        title="Send Notification To Child"
        onPress={sendNotificationToChild}
      />
    </View>
  );
};

export default ChildNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
