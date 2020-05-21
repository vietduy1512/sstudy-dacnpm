import React from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const GoogleButton = () => {
  return (
    <GoogleSigninButton
      style={{marginHorizontal: 25}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={this.props.onPress}
    />
  );
};

export default GoogleButton;
