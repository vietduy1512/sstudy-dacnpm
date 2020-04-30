import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, Button} from 'react-native';

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

const ChildNotificationScreen = () => {
  const sendNotification = () => {
    PushNotification.localNotification({
      foreground: false,
      userInteraction: false,
      title: 'Notification from parent',
      message: 'Hello, how are you today?',
      data: {},
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Send Notification" onPress={sendNotification} />
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
