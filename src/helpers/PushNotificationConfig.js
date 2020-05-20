import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import {DEVICE_TOKEN} from 'constants/async-storage';

const PushNotificationConfig = () => {
  useEffect(() => {
    PushNotification.configure({
      onRegister: async function(result) {
        console.log('Device Token:', result);
        let deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
        if (!deviceToken || deviceToken !== result.token) {
          await AsyncStorage.setItem(DEVICE_TOKEN, result.token);
        }
      },
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification);
      },
      senderID: '16277734532',
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  return null;
};

export default PushNotificationConfig;
