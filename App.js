import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import AsyncStorage from '@react-native-community/async-storage';
import {APP_TYPE} from 'constants/async-storage';
import {AppType} from 'constants/app';
import ParentDashboardDrawer from 'components/drawer/ParentDashboardDrawer';
import ChildDashboardDrawer from 'components/drawer/ChildDashboardDrawer';
import ChooseAppTypeScreen from 'screens/settings/ChooseAppTypeScreen';

export default function App() {
  const [appType, setAppType] = useState('loading');

  useEffect(() => {
    async function fetchData() {
      let type = await AsyncStorage.getItem(APP_TYPE);
      setAppType(parseInt(type, 10));
    }
    fetchData();
  }, []);

  const mainLayout = () => {
    if (appType === AppType.PARENT) {
      return <ParentDashboardDrawer />;
    } else if (appType === AppType.CHILD) {
      return <ChildDashboardDrawer />;
    } else if (appType === 'loading') {
      // TODO: loading icon
      <></>;
    } else {
      return <ChooseAppTypeScreen />;
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>{mainLayout()}</NavigationContainer>
    </Provider>
  );
}
