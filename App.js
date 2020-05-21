import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import {AppType} from 'constants/app';
import ParentDashboardDrawer from 'components/drawer/ParentDashboardDrawer';
import ChildDashboardDrawer from 'components/drawer/ChildDashboardDrawer';
import ChooseAppTypeScreen from 'screens/common/settings/ChooseAppTypeScreen';
import PushNotificationConfig from './src/helpers/PushNotificationConfig';
import {updateAppType} from 'actions/appAction';
import {connect} from 'react-redux';
import {Root} from 'native-base';

const App = props => {
  return (
    <Root>
      <Provider store={store}>
        <NavigationContainer>
          <RenderMainLayout />
          <PushNotificationConfig />
        </NavigationContainer>
      </Provider>
    </Root>
  );
};

export default App;

const MainLayout = props => {
  useEffect(() => {
    props.updateAppType();
  }, [props]);

  if (props.appType === AppType.PARENT) {
    return <ParentDashboardDrawer />;
  } else if (props.appType === AppType.CHILD) {
    return <ChildDashboardDrawer />;
  } else if (props.appType === AppType.LOADING) {
    // TODO: loading icon
    return <></>;
  } else {
    return <ChooseAppTypeScreen />;
  }
};

const mapStateToProps = state => ({
  appType: state.app.type,
});

const RenderMainLayout = connect(
  mapStateToProps,
  {updateAppType},
)(MainLayout);
