import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {CHILD_LOCATION_RESPONSE} from 'constants/socket-events';
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
  const [isValidLocation, setIsValidLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    setupDefaultRegion();
    getChildLocation();
    socket.on(CHILD_LOCATION_RESPONSE, position => {
      if (!position.coords) {
        showError();
        setupDefaultRegion();
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

  const setupDefaultRegion = () => {
    setIsValidLocation(false);
    setCurrentRegion({
      latitude: 10.762622,
      longitude: 106.660172,
      latitudeDelta: 0.00922 * 3,
      longitudeDelta: 0.00421 * 3,
    });
  };

  const getChildLocation = async () => {
    if (props.currentUser && props.currentUser.email) {
      try {
        setIsLoading(true);
        // TODO: Implement waiting icon
        await axios.get('/location/getChildLocation');
      } catch (error) {
        showError();
      }
      setIsLoading(false);
    }
  };

  const showError = () => {
    Alert.alert(
      'Failed to get location',
      'Connection is unstable. Please try again',
    );
  };

  const updateCurrentAddress = async (latitude, longitude) => {
    let geocoder = await Geocoder.from(latitude, longitude);
    let address = geocoder.results[0].formatted_address;
    setCurrentAddress(address);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={currentRegion}>
        {isValidLocation ? (
          <Marker
            coordinate={currentRegion}
            title={'Vị trí của trẻ'}
            description={currentAddress}
          />
        ) : null}
      </MapView>
      <Button
        title="Get new location"
        disabled={isLoading}
        onPress={getChildLocation}
      />
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
