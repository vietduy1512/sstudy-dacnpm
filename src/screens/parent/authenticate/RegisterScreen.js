import React, {useState} from 'react';
import axios from 'axios';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import RegisterForm from 'components/forms/registerForm';
import LoginButton from '../../../components/buttons/LoginButton';
import {LOGIN} from 'constants/navigation';
import LoginWallpaper from 'components/wallpapers/LoginWallpaper';
import bgSrc from 'assets/images/bg-4.jpg';

const RegisterScreen = props => {
  const [errorMessage, setErrorMessage] = useState([]);

  const handleRegister = values => {
    axios
      .post('/auth/register', values)
      .then(response => {
        if (!response.data.errmsg) {
          props.navigation.navigate('Login');
        } else {
          setErrorMessage(['Email is already taken']);
        }
      })
      .catch(error => {
        if (!error.response || !error.response.data) {
          setErrorMessage(['Something went wrong']);
          return;
        }

        switch (error.response.status) {
          case 401:
            setErrorMessage(error.response.data.errors.map(err => err.msg));
            break;
          case 400:
            setErrorMessage(error.response.data.errors.map(err => err.msg));
            break;
          default:
            break;
        }
      });
  };

  return (
    <LoginWallpaper bgSrc={bgSrc}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Create an account</Text>
          <RegisterForm handleRegister={handleRegister} />
          <View style={styles.errorMessage}>
            {errorMessage.map(msg => (
              <Text style={styles.errorText}>{msg}</Text>
            ))}
          </View>
          <View style={styles.conPolicy}>
            <Text style={styles.policy}>
              By sign up, you agree with the{' '}
              <Text style={styles.term_service}>Terms of Service</Text> and{' '}
              <Text style={styles.term_service}>Privacy Policy</Text>
            </Text>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <LoginButton
              title="Already have an account?"
              onPress={() => props.navigation.navigate(LOGIN)}
            />
          </View>
        </View>
      </ScrollView>
    </LoginWallpaper>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  section: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  submit: {
    width: 100,
    alignSelf: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  errorMessage: {
    alignItems: 'center',
    marginTop: 10,
  },
  errorText: {
    color: '#FF0000',
  },
  conPolicy: {
    marginTop: 10,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: '#a64d79',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  policy: {
    fontSize: 17,
    fontStyle: 'italic',
  },
  term_service: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  login: {
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#a64d79',
    padding: 10,
    borderRadius: 4,
  },
  txtLogin: {
    alignSelf: 'center',
    color: '#a64d79',
  },
});
