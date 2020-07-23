/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {login} from 'actions/appAction';
import axios from 'axios';
import {Text, View, StyleSheet} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import {DEVICE_TOKEN} from 'constants/async-storage';
import PushNotificationConfig from '../../../helpers/PushNotificationConfig';

import LoginInput from '../../../components/inputs/LoginInput';
import LoginButton from '../../../components/buttons/LoginButton';
import LoginWallpaper from '../../../components/wallpapers/LoginWallpaper';
import bgSrc from 'assets/images/bg-2.jpg';
import LoadingScreen from '../../common/LoadingScreen';
import {REGISTER} from 'constants';

const LoginScreen = props => {
  const [form, setForm] = useState({
    email: 'admin@gmail.com',
    password: '123456',
  });
  const [errorMessage, setErrorMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSplashing, setIsSplashing] = useState(true);

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  useEffect(() => {
    setTimeout(() => setIsSplashing(false), 3000);
  }, []);

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
        console.log(error);
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

  return isSplashing ? (
    <LoadingScreen />
  ) : (
    <LoginWallpaper bgSrc={bgSrc}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>SIGN IN</Text>
          <View style={{margin: 25}}>
            <Text style={{fontWeight: 'bold', color: '#a64d79'}}>Email</Text>
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
            <Text style={{fontWeight: 'bold', color: '#a64d79'}}>Password</Text>
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
            <LoginButton
              title="Register"
              onPress={() => props.navigation.navigate(REGISTER)}
              // isLoading={isLoading}
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
