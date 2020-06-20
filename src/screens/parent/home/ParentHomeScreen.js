import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import SquareButton from 'screens/common/SquareButton';
import PushNotificationConfig from '../../../helpers/PushNotificationConfig';
import {
  LOCATION,
  MESSAGE,
  NOTIFICATION,
  GENERATE_TOKEN,
  LOGOUT,
} from 'constants';

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <SquareButton
          title="Location"
          image={require('assets/images/home-location.jpg')}
          onPress={() => props.navigation.navigate(LOCATION)}
        />
        <SquareButton
          title="Messaging"
          image={require('assets/images/home-messaging.jpg')}
          onPress={() => props.navigation.navigate(MESSAGE)}
        />
        <SquareButton
          title="Notification"
          image={require('assets/images/home-notification.png')}
          onPress={() => props.navigation.navigate(NOTIFICATION)}
        />
        <SquareButton
          title="Generate token"
          image={require('assets/images/home-token.jpg')}
          onPress={() => props.navigation.navigate(GENERATE_TOKEN)}
        />
        <SquareButton
          title="Logout"
          image={require('assets/images/logout.jpg')}
          onPress={() => props.navigation.navigate(LOGOUT)}
        />
      </View>
      <Image style={styles.logo} source={require('assets/images/bg-2.jpg')} />
      <PushNotificationConfig />
    </View>
  );
};

const mapStateToProps = state => ({
  currentUser: state.app.user,
});

export default connect(
  mapStateToProps,
  {},
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    zIndex: 1,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    position: 'absolute',
    width: 450,
    height: 700,
    zIndex: -1,
  },
});
