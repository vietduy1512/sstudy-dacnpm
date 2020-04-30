import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {INIT_PARENT_SESSION} from 'constants/socket-events';
import socket from 'socketio';
import {connect} from 'react-redux';

const HomeScreen = props => {
  useEffect(() => {
    if (props.currentUser && props.currentUser.email) {
      socket.emit(INIT_PARENT_SESSION, props.currentUser.email);
    }
  }, [props.currentUser]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('assets/images/bg-2.jpg')} />
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
  },
  logo: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
