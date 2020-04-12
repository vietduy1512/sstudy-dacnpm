import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import store from './src/store';
import Geocoder from 'react-native-geocoding';

import DashboardDrawer from './src/components/common/DashboardDrawer';
import ChildLocation from './src/components/location/ChildLocation';
import ChildNotification from './src/components/notification/ChildNotification';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    switch (route.name) {
      case 'Dashboard':
        iconName = focused ? 'ios-home' : 'ios-home-outline';
        break;
      case 'Location':
        //iconName = focused ? 'ios-settings' : 'ios-settings-outline';
        iconName = focused ? 'ios-list-box' : 'ios-list';
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
};

export default function App() {
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
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={screenOptions}
          tabBarOptions={tabBarOptions}
          initialRouteName="Location">
          <Tab.Screen name="Dashboard" component={DashboardDrawer} />
          <Tab.Screen name="Location" component={ChildLocation} />
          <Tab.Screen name="Notification" component={ChildNotification} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
