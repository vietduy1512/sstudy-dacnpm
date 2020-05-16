import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button, Alert, Text} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const ChildLocationScreen = props => {
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00922 * 3,
    longitudeDelta: 0.00421 * 3,
    updatedAt: null,
  });
  const [isValidLocation, setIsValidLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    setupDefaultRegion();
    getChildLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setupDefaultRegion = () => {
    setIsValidLocation(false);
    setCurrentRegion({
      ...currentRegion,
      latitude: 10.762622,
      longitude: 106.660172,
    });
  };

  const getChildLocation = async () => {
    if (props.currentUser && props.currentUser.email) {
      try {
        setIsLoading(false);
        // TODO: Implement waiting icon
        let response = await axios.get('/location/getChildLocation');
        let childLocation = response.data;
        if (!childLocation) {
          showError();
          setupDefaultRegion();
          return;
        }
        setIsValidLocation(true);
        setCurrentRegion({
          ...currentRegion,
          latitude: childLocation.latitude,
          longitude: childLocation.longitude,
          updatedAt: childLocation.updatedAt,
        });
        updateCurrentAddress(childLocation.latitude, childLocation.longitude);
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
          <Marker coordinate={currentRegion}>
            <Callout style={styles.callout}>
              <Text style={styles.title}>{'Vị trí của trẻ'}</Text>
              <Text>{currentAddress}</Text>
              <Text>{moment(currentRegion.updatedAt).fromNow()}</Text>
            </Callout>
          </Marker>
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
  callout: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
});
