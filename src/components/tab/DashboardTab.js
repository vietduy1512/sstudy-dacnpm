import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoding';

import {DASHBOARD, LOCATION, MESSAGE, NOTIFICATION} from 'constants';
import ChildLocationScreen from 'screens/location/ChildLocationScreen';
import ChildNotificationScreen from 'screens/notification/ChildNotificationScreen';
import MessageScreen from 'screens/message/MessageScreen';

const Tab = createBottomTabNavigator();

export default function DashboardTab() {
  async function requestLocationPermission() {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    Geocoder.init('AIzaSyB785g-zg89YA-DzRL8zmrMxXIV3T5e5-A');
    requestLocationPermission();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}
      initialRouteName={LOCATION}>
      <Tab.Screen name={LOCATION} component={ChildLocationScreen} />
      <Tab.Screen name={MESSAGE} component={MessageScreen} />
      <Tab.Screen name={NOTIFICATION} component={ChildNotificationScreen} />
    </Tab.Navigator>
  );
}

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    switch (route.name) {
      case DASHBOARD:
        iconName = focused ? 'ios-home' : 'ios-home';
        break;
      case LOCATION:
        //iconName = focused ? 'ios-settings' : 'ios-settings-outline';
        iconName = focused ? 'ios-list-box' : 'ios-list';
        break;
      case MESSAGE:
        iconName = 'ios-chatbubbles';
        break;
      default:
        iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
        break;
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const tabBarOptions = {
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
  keyboardHidesTabBar: true,
};
