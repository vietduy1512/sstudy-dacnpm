import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HOME, PARENT_ADDRESS, APP_TYPE} from 'constants';
import ChildHome from 'screens/child/home/ChildHomeScreen';
import ParentAddressScreen from 'screens/child/settings/ParentAddressScreen';
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
      <Drawer.Screen name={PARENT_ADDRESS} component={ParentAddressScreen} />
      <Drawer.Screen name={APP_TYPE} component={ChooseAppTypeScreen} />
    </Drawer.Navigator>
  );
};

export default DashboardDrawer;
