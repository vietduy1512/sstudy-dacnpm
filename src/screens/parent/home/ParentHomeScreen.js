import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import PushNotificationConfig from '../../../helpers/PushNotificationConfig';
import {
  LOCATION,
  MESSAGE,
  NOTIFICATION,
  GENERATE_TOKEN,
  LOGOUT,
  APP_TYPE,
} from '../../../constants';
import HomeButton from '../../../components/buttons/ParentHomeButton';

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <HomeButton
          title="Location"
          image={require('assets/images/search-location.jpg')}
          onPress={() => props.navigation.navigate(LOCATION)}
        />
        <HomeButton
          title="Message"
          image={require('assets/images/message.jpg')}
          onPress={() => props.navigation.navigate(MESSAGE)}
        />
        <HomeButton
          title="Noti"
          image={require('assets/images/noti.jpg')}
          onPress={() => props.navigation.navigate(NOTIFICATION)}
        />
        <HomeButton
          title="Generate token"
          image={require('assets/images/key.jpg')}
          onPress={() => props.navigation.navigate(GENERATE_TOKEN)}
        />
        <HomeButton
          title="Change app type"
          image={require('assets/images/swap.jpg')}
          onPress={() => props.navigation.navigate(APP_TYPE)}
        />
        <HomeButton
          title="Logout"
          image={require('assets/images/log-out.jpg')}
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
    justifyContent: 'space-evenly',
  },
  logo: {
    // flex: 1,
    position: 'absolute',
    width: 450,
    height: 700,
    zIndex: -1,
  },
});
