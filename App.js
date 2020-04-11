import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import store from './src/store';

import Home from './src/components/home/HomePage';
import LoginForm from './src/components/auth/LoginForm';
import RegisterForm from './src/components/auth/RegisterForm';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}

function LoginScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Login" component={LoginForm} />
    </HomeStack.Navigator>
  );
}

function RegisterScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Register" component={RegisterForm} />
    </HomeStack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.settings}>
      <Text>Settings!</Text>
    </View>
  );
}

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    switch (route.name) {
      case 'Home':
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
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Register" component={RegisterScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  home: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  addButton: {
    position: 'absolute',
    borderRadius: 40,
    height: 80,
    width: 80,
    padding: 5,
    right: 15,
    bottom: 15,
  },
  addButtonImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
