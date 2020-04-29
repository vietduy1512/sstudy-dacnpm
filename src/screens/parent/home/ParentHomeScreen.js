import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {CHILD_LOCATION_REQUEST} from 'constants/socket-events';
import socket from 'socketio';
import registerChildLocationResponseListener from '../location/locationSocket';
import axios from 'axios';
import {connect} from 'react-redux';

registerChildLocationResponseListener();

const HomeScreen = props => {
  const getChildLocation = () => {
    if (props.currentUser && props.currentUser.email) {
      socket.emit(CHILD_LOCATION_REQUEST, props.currentUser.email, async () => {
        await axios.get('/location/getChildLocation');
      });
    } else {
      // TODO
      console.log('Not logged in yet!');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get child location" onPress={getChildLocation} />
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
});
