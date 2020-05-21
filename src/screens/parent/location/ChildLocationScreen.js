/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  Image,
} from 'react-native';
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
  const markerRef = useRef(null);

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
        setIsLoading(true);
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
          <Marker coordinate={currentRegion} ref={markerRef}>
            <View style={styles.imageContainer}>
              <Image
                source={require('assets/images/child-location-marker.png')}
                style={styles.image}
              />
            </View>
            <Callout style={styles.callout}>
              <Text style={styles.title}>{'Vị trí của trẻ'}</Text>
              <Text style={styles.address}>{currentAddress}</Text>
              <Text>{moment(currentRegion.updatedAt).fromNow()}</Text>
            </Callout>
          </Marker>
        ) : null}
      </MapView>
      <TouchableOpacity
        style={{
          ...styles.refreshBtn,
          opacity: isLoading ? 0.3 : 1,
        }}
        disabled={isLoading}
        onPress={getChildLocation}>
        <Image
          style={styles.refreshBtnImage}
          source={require('assets/images/refresh-child-location-marker.png')}
        />
      </TouchableOpacity>
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
  refreshBtn: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 30,
    height: 60,
    width: 60,
    padding: 5,
    right: 15,
    bottom: 15,
  },
  refreshBtnImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  imageContainer: {
    height: 50,
    width: 40,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  callout: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 13,
    borderColor: 'lightgray',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
});
