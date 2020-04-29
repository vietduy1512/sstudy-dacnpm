import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HOME, PARENT_ADDRESS, APP_TYPE} from 'constants';
import ChildHome from 'screens/home/ChildHomeScreen';
import ChooseAppTypeScreen from 'screens/settings/ChooseAppTypeScreen';
import ParentAddressScreen from 'screens/settings/ParentAddressScreen';

const Drawer = createDrawerNavigator();

const DashboardDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={HOME} component={ChildHome} />
      <Drawer.Screen name={PARENT_ADDRESS} component={ParentAddressScreen} />
      <Drawer.Screen name={APP_TYPE} component={ChooseAppTypeScreen} />
    </Drawer.Navigator>
  );
};

export default DashboardDrawer;
