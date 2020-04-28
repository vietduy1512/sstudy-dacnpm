import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppState} from 'constants/app';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {SAVE_PARENT_ADDRES_SESSION} from 'constants/socket-events';
import {PARENT_ADDRESS} from 'constants/async-storage';
import socket from '../../socketio';

import {HOME, LOGIN, LOGOUT, REGISTER} from 'constants';
import Home from 'screens/home/HomeScreen';
import Login from 'screens/authenticate/LoginScreen';
import Register from 'screens/authenticate/RegisterScreen';
import Logout from 'screens/authenticate/LogoutScreen';
import DashboardTab from 'components/tab/DashboardTab';
import ParentAddressScreen from 'screens/settings/ParentAddressScreen';

const Drawer = createDrawerNavigator();

const DashboardDrawer = props => {
  const isAuthenticated = props.appState === AppState.AUTHENTICATED;

  useEffect(() => {
    async function initSession() {
      socket.emit(
        SAVE_PARENT_ADDRES_SESSION,
        await AsyncStorage.getItem(PARENT_ADDRESS),
      );
    }
    initSession();
  }, []);

  return (
    <Drawer.Navigator>
      {isAuthenticated ? (
        <>
          <Drawer.Screen name={HOME} component={Home} />
          <Drawer.Screen name={'Features'} component={DashboardTab} />
          <Drawer.Screen name={LOGOUT} component={Logout} />
        </>
      ) : (
        <>
          <Drawer.Screen
            name={'Parent Address'}
            component={ParentAddressScreen}
          />
          <Drawer.Screen name={HOME} component={Home} />
          <Drawer.Screen name={LOGIN} component={Login} />
          <Drawer.Screen name={REGISTER} component={Register} />
        </>
      )}
    </Drawer.Navigator>
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
