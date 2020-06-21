import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {HOME, EMERGENCY, APP_TYPE} from 'constants';
import ChildHome from 'screens/child/home/ChildHomeScreen';
import EmergencyScreen from 'screens/child/emergency/EmergencyScreen';
import ChooseAppTypeScreen from 'screens/common/settings/ChooseAppTypeScreen';

const Stack = createStackNavigator();

const DashboardDrawer = () => {
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
    requestLocationPermission();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name={HOME} component={ChildHome} />
      <Stack.Screen name={EMERGENCY} component={EmergencyScreen} />
      <Stack.Screen name={APP_TYPE} component={ChooseAppTypeScreen} />
    </Stack.Navigator>
  );
};

export default DashboardDrawer;
