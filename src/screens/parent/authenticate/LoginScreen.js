/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
// import {useToasts} from 'react-toast-notifications';
import {connect} from 'react-redux';
import {login} from 'actions/appAction';
import axios from 'axios';
import {Text, View, StyleSheet} from 'react-native';
import Toast from 'react-native-simple-toast';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import {DEVICE_TOKEN} from 'constants/async-storage';
import PushNotificationConfig from '../../../helpers/PushNotificationConfig';

import LoginInput from '../../../components/inputs/LoginInput';
import LoginButton from '../../../components/buttons/LoginButton';
// import GoogleButton from '../../../components/buttons/GoogleButton';
import LoginWallpaper from '../../../components/wallpapers/LoginWallpaper';
import bgSrc from 'assets/images/bg-2.jpg';

const LoginScreen = props => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '16277734532-r8dd0tbuohav59o31ptvk1ghck8vt57a.apps.googleusercontent.com',
      offlineAccess: false,
    });
    //Check if user is already signed in
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      Toast.show('User is already signed in');
      //Get the User details as user is already signed in
      _getCurrentUserInfo();
    } else {
      // Toast.show('Please Login');
    }
  };

  const _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
        console.log(error.code);
      }
    }
  };

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = async event => {
    setIsLoading(true);
    let deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
    axios
      .post('/auth/login', {...form, deviceToken: deviceToken})
      .then(response => {
        setIsLoading(false);
        if (response.status === 200) {
          let user = response.data;
          props.login(user);
        }
      })
      .catch(error => {
        setIsLoading(false);
        // console.log(error.message);
        // TODO
        if (
          !error.response ||
          !error.response.data ||
          !error.response.data ||
          !error.response.data.errors
        ) {
          setErrorMessage(['Something went wrong']);
          Toast.show(error.message);
          return;
        }
      });
  };

  return (
    <LoginWallpaper bgSrc={bgSrc}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>SIGN IN</Text>
          <View style={{margin: 25}}>
            <Text style={{fontWeight: 'bold'}}>Email</Text>
            <LoginInput
              iconName="mail"
              placeholder="Enter your email"
              style={styles.textInput}
              value={form.email}
              keyboardType="email-address"
              returnKeyType={'next'}
              // onSubmitEditing={() => this.passwordInput.focus()}
              blurOnSubmit={false}
              onChangeText={value => handleChange('email', value)}
            />
          </View>

          <View style={{margin: 25}}>
            <Text style={{fontWeight: 'bold'}}>Password</Text>
            <LoginInput
              iconName="lock"
              secureTextEntry={true}
              placeholder="Enter your password"
              style={styles.textInput}
              value={form.password}
              returnKeyType="done"
              // reference={r => (this.passwordInput = r)}
              onChangeText={value => handleChange('password', value)}
            />
          </View>

          <View style={{margin: 25}}>
            <LoginButton
              title="Login"
              onPress={handleSubmit}
              isLoading={isLoading}
            />
          </View>
        </View>
        <View>
          <View style={{marginHorizontal: 25, marginBottom: 10}}>
            <GoogleSigninButton
              style={{marginHorizontal: 25, alignSelf: 'center'}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={_signIn}
            />
          </View>
        </View>
      </View>
      <PushNotificationConfig />
    </LoginWallpaper>
  );
};

const mapStateToProps = state => ({
  appState: state.app.state,
  currentUser: state.app.user,
});

export default connect(
  mapStateToProps,
  {login},
)(LoginScreen);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between'},
  title: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a64d79',
  },
});
