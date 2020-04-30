import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

const PushNotificationConfig = () => {
  useEffect(() => {
    PushNotification.configure({
      onRegister: function(token) {
        console.log('TOKEN:', token);
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
