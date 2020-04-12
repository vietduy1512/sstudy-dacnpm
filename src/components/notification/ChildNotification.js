import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);
    // process the notification
  },
  senderID: '',
  popInitialNotification: true,
  requestPermissions: true,
});

function ChildNotification() {
  const sendNotification = () => {
    PushNotification.localNotification({
      foreground: false,
      userInteraction: false,
      title: 'From Child',
      message: 'My Notification Message',
      data: {},
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Send Notification" onPress={sendNotification} />
    </View>
  );
}

export default ChildNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
