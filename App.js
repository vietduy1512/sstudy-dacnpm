import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import store from './src/store';

import DashboardDrawer from './src/components/common/DashboardDrawer';

const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View>
      <Text>Settings!</Text>
    </View>
  );
}

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    switch (route.name) {
      case 'Dashboard':
        iconName = focused ? 'ios-home' : 'ios-home-outline';
        break;
      case 'Settings':
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
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={screenOptions}
          tabBarOptions={tabBarOptions}>
          <Tab.Screen name="Dashboard" component={DashboardDrawer} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
