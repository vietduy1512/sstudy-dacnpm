import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {
  CHILD_LOCATION_REQUEST,
  CHILD_LOCATION_RESPONSE,
} from 'constants/socket-events';
import socket from 'socketio';
import {connect} from 'react-redux';
import axios from 'axios';

const ChildLocationScreen = props => {
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [currentAddress, setCurrentAddress] = useState('');

  const getChildLocation = async () => {
    if (props.currentUser && props.currentUser.email) {
      await axios.get('/location/getChildLocation');
    } else {
      Alert.alert('Not logged in!', 'Please log in to get child location');
    }
  };

  const updateCurrentAddress = async (latitude, longitude) => {
    let geocoder = await Geocoder.from(latitude, longitude);
    let address = geocoder.results[0].formatted_address;
    setCurrentAddress(address);
  };

  useEffect(() => {
    getChildLocation();
    socket.on(CHILD_LOCATION_RESPONSE, position => {
      if (!position.coords) {
        Alert.alert(
          'Failed to get location',
          'Connection is unstable. Please try again',
        );
        return;
      }
      setCurrentRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 3,
        longitudeDelta: 0.00421 * 3,
      });
      updateCurrentAddress(position.coords.latitude, position.coords.longitude);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={currentRegion}>
        <Marker
          coordinate={currentRegion}
          title={'Vị trí của trẻ'}
          description={currentAddress}
        />
      </MapView>
      <Button title="Get new location" onPress={getChildLocation} />
    </View>
  );
};

const mapStateToProps = state => ({
  currentUser: state.app.user,
});

export default connect(
  mapStateToProps,
  {},
)(ChildLocationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
