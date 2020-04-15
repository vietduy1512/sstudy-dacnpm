import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import DashboardDrawer from 'components/drawer/DashboardDrawer';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DashboardDrawer />
      </NavigationContainer>
    </Provider>
  );
}
