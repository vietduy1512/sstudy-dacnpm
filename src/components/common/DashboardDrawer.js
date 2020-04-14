import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppState} from 'constants/app';

import {HOME, LOGIN, LOGOUT, REGISTER} from 'constants';
import Home from 'screens/home/HomePage';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import Logout from '../auth/Logout';
import {connect} from 'react-redux';

const Drawer = createDrawerNavigator();

const DashboardDrawer = props => {
  const isAuthenticated = props.appState === AppState.AUTHENTICATED;

  return (
    <Drawer.Navigator>
      {isAuthenticated ? (
        <>
          <Drawer.Screen name={HOME} component={Home} />
          <Drawer.Screen name={LOGOUT} component={Logout} />
        </>
      ) : (
        <>
          <Drawer.Screen name={LOGIN} component={LoginForm} />
          <Drawer.Screen name={REGISTER} component={RegisterForm} />
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
