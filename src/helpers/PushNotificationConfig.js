import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import {DEVICE_TOKEN} from 'constants/async-storage';
import {useNavigation} from '@react-navigation/native';
import {EMERGENCY_ALERT} from 'constants';
import {AppState} from "react-native";


const PushNotificationConfig = () => {
  const navigation = useNavigation();
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
        switch (notification.type) {
          case 'EMERGENCY':
            if (AppState.currentState.match(/inactive|background/)) {
              PushNotification.localNotification({
                color: 'red',
                vibrate: true,
                vibration: 10000,
                message: 'Your child is in danger',
                soundName: 'alarm.mp3',
              });
            } else {
              navigation.navigate(EMERGENCY_ALERT);
            }
            break;
          default:
            break;
        }
      },
      senderID: '16277734532',
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, [navigation]);
  return null;
};

export default PushNotificationConfig;
