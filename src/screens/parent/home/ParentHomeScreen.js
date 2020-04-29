import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import registerChildLocationResponseListener from '../location/locationSocket';
import axios from 'axios';

registerChildLocationResponseListener();

const HomeScreen = () => {
  const getChildLocation = async () => {
    await axios.get('/location/getChildLocation');
  };

  return (
    <View style={styles.container}>
      <Button title="Get child location" onPress={getChildLocation} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
