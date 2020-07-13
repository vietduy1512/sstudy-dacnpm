import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {PacmanIndicator} from 'react-native-indicators';
import LoginWallpaper from '../../components/wallpapers/LoginWallpaper';
import bgSrc from 'assets/images/bg-2.jpg';

const LoadingScreen = props => {
  return (
    <LoginWallpaper bgSrc={bgSrc}>
      <View style={styles.container}>
        <PacmanIndicator color="#a64d79" size={128} style={{flex: 1}} />
        <Text style={styles.txt}>Loading ...</Text>
      </View>
    </LoginWallpaper>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    flex: 2,
    color: '#a64d79',
    fontSize: 18,
    marginBottom: 20,
  },
});
