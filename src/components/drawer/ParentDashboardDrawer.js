import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppState} from 'constants/app';
import {connect} from 'react-redux';
import {HOME, LOGIN, LOGOUT, REGISTER, APP_TYPE} from 'constants';
import ParentHome from 'screens/home/ParentHomeScreen';
import Login from 'screens/authenticate/LoginScreen';
import Register from 'screens/authenticate/RegisterScreen';
import Logout from 'screens/authenticate/LogoutScreen';
import DashboardTab from 'components/tab/DashboardTab';
import ChooseAppTypeScreen from 'screens/settings/ChooseAppTypeScreen';

const Drawer = createDrawerNavigator();

const DashboardDrawer = props => {
  const isAuthenticated = props.appState === AppState.AUTHENTICATED;

  return (
    <Drawer.Navigator>
      {isAuthenticated ? (
        <>
          <Drawer.Screen name={HOME} component={ParentHome} />
          <Drawer.Screen name={'Features'} component={DashboardTab} />
          <Drawer.Screen name={LOGOUT} component={Logout} />
          <Drawer.Screen name={APP_TYPE} component={ChooseAppTypeScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen name={HOME} component={ParentHome} />
          <Drawer.Screen name={LOGIN} component={Login} />
          <Drawer.Screen name={REGISTER} component={Register} />
          <Drawer.Screen name={APP_TYPE} component={ChooseAppTypeScreen} />
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
