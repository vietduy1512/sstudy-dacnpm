import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {AppState} from 'constants/app';
import {connect} from 'react-redux';

import {
  LOCATION,
  DEVICE_INFO,
  NOTIFICATION,
  GENERATE_TOKEN,
  HOME,
  LOGIN,
  LOGOUT,
  REGISTER,
  APP_TYPE,
  EMERGENCY_ALERT,
} from '../../constants';
import {PermissionsAndroid} from 'react-native';
import Geocoder from 'react-native-geocoding';
import ParentHome from 'screens/parent/home/ParentHomeScreen';
import Login from 'screens/parent/authenticate/LoginScreen';
import Register from 'screens/parent/authenticate/RegisterScreen';
import Logout from 'screens/parent/authenticate/LogoutScreen';
import ChooseAppTypeScreen from 'screens/common/settings/ChooseAppTypeScreen';
import ChildLocationScreen from 'screens/parent/location/ChildLocationScreen';
import ChildNotificationScreen from 'screens/parent/notification/ChildNotificationScreen';
import DeviceInfoScreen from 'screens/parent/deviceInfo';
import GenerateTokenScreen from 'screens/parent/authenticate/GenerateTokenScreen';
import EmergencyAlert from 'screens/parent/emergency/EmergencyAlert';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DashboardDrawer = props => {
  const isAuthenticated = props.appState === AppState.AUTHENTICATED;

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

  return !isAuthenticated ? (
    <>
      <Stack.Navigator
        initialRouteName="HOME"
        screenOptions={{
          headerStyle: {backgroundColor: "#a64d79"},
          headerTintColor: 'white',
          headerTitleStyle: {fontSize: 20},
        }}>
        <Stack.Screen name={HOME} component={ParentHome} />
        <Stack.Screen name={LOCATION} component={ChildLocationScreen} />
        <Stack.Screen name={DEVICE_INFO} component={DeviceInfoScreen} />
        <Stack.Screen name={NOTIFICATION} component={ChildNotificationScreen} />
        <Stack.Screen name={GENERATE_TOKEN} component={GenerateTokenScreen} />
        <Stack.Screen name={LOGOUT} component={Logout} />
        <Stack.Screen name={EMERGENCY_ALERT} component={EmergencyAlert} />
        <Stack.Screen name={APP_TYPE} component={ChooseAppTypeScreen} />
      </Stack.Navigator>
    </>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={REGISTER} component={Register} />
      <Stack.Screen name={EMERGENCY_ALERT} component={EmergencyAlert} />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  appState: state.app.state,
  currentUser: state.app.user,
});

export default connect(
  mapStateToProps,
  {},
)(DashboardDrawer);
