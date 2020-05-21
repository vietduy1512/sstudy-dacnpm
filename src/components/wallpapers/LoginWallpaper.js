import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';

// import bgSrc from 'assets/images/bg-2.jpg';

export default function LoginWallpaper({bgSrc, children}) {
  return (
    <ImageBackground style={styles.picture} source={bgSrc}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
