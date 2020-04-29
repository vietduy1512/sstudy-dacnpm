import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('assets/images/bg-2.jpg')} />
    </View>
  );
};

export default HomeScreen;

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
