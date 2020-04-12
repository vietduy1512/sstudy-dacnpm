import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

function ChildLocation() {
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [currentAddress, setCurrentAddress] = useState('');

  const updateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 3,
          longitudeDelta: 0.00421 * 3,
        });
        updateCurrentAddress(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      error => console.log(error),
    );
  };

  const updateCurrentAddress = async (latitude, longitude) => {
    let geocoder = await Geocoder.from(latitude, longitude);
    let address = geocoder.results[0].formatted_address;
    setCurrentAddress(address);
  };

  useEffect(() => {
    updateCurrentPosition();
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
      <Button title="Refresh" onPress={updateCurrentPosition} />
    </View>
  );
}

export default ChildLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
