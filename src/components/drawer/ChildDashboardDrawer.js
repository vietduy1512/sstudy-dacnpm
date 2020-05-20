import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HOME, AUTHENTICATE_TOKEN, APP_TYPE} from 'constants';
import ChildHome from 'screens/child/home/ChildHomeScreen';
import AuthenticateToken from 'screens/child/settings/AuthenticateTokenScreen';
import ChooseAppTypeScreen from 'screens/common/settings/ChooseAppTypeScreen';

const Drawer = createDrawerNavigator();

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
    <Drawer.Navigator>
      <Drawer.Screen name={HOME} component={ChildHome} />
      <Drawer.Screen name={AUTHENTICATE_TOKEN} component={AuthenticateToken} />
      <Drawer.Screen name={APP_TYPE} component={ChooseAppTypeScreen} />
    </Drawer.Navigator>
  );
};

export default DashboardDrawer;
