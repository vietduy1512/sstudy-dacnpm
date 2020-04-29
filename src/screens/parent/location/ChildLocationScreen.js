import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
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

  socket.on(CHILD_LOCATION_RESPONSE, position => {
    // TODO: add this data which get from child to your map
    console.log(position);
    setCurrentRegion({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.00922 * 3,
      longitudeDelta: 0.00421 * 3,
    });
    updateCurrentAddress(position.coords.latitude, position.coords.longitude);
  });

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

  const updateCurrentAddress = async (latitude, longitude) => {
    let geocoder = await Geocoder.from(latitude, longitude);
    let address = geocoder.results[0].formatted_address;
    setCurrentAddress(address);
  };

  useEffect(() => {
    getChildLocation();
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
