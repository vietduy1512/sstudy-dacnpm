/* eslint-disable no-unused-vars */
import React, {useState, useRef} from 'react';
import {View, StyleSheet, TextInput, Button, Alert, Text} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {PARENT_ID, DEVICE_TOKEN} from 'constants/async-storage';
import {HOME} from '../../../constants';

const AuthenticateTokenScreen = props => {
  const [char1, setChar1] = useState('');
  const [char2, setChar2] = useState('');
  const [char3, setChar3] = useState('');
  const [char4, setChar4] = useState('');
  const [char5, setChar5] = useState('');
  const [char6, setChar6] = useState('');
  const refs = [null, null, null, null, null, null];
  const setChars = [setChar1, setChar2, setChar3, setChar4, setChar5, setChar6];

  const handleChange = (value, position) => {
    let index = position - 1;
    setChars[index](value);

    if (value === '') {
      return;
    }

    if (position !== 6) {
      refs[index + 1].focus();
    } else {
      refs[index].blur();
    }
  };

  const clearData = () => {
    for (const setChar of setChars) {
      setChar('');
    }
  };

  const setRef = (input, pos) => {
    refs[pos - 1] = input;
  };

  const submitOtpToken = async () => {
    let token = `${char1}${char2}${char3}${char4}${char5}${char6}`;
    if (token.length !== 6) {
      clearData();
      return Alert.alert('Incorrect input');
    }

    try {
      let response = await axios.post('/auth/validateOTP', {token: token});
      await AsyncStorage.setItem(PARENT_ID, response.data.parentId.toString());
      props.navigation.navigate(HOME);
    } catch (error) {
      clearData();
      Alert.alert('Failed to validate your otp');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input your Otp</Text>
      <View style={styles.otpContainer}>
        <TextInput
          placeholder="-"
          style={styles.tokenInput}
          value={char1}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={value => handleChange(value, 1)}
          ref={input => setRef(input, 1)}
        />
        <TextInput
          placeholder="-"
          style={styles.tokenInput}
          value={char2}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={value => handleChange(value, 2)}
          ref={input => setRef(input, 2)}
        />
        <TextInput
          placeholder="-"
          style={styles.tokenInput}
          value={char3}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={value => handleChange(value, 3)}
          ref={input => setRef(input, 3)}
        />
        <TextInput
          placeholder="-"
          style={styles.tokenInput}
          value={char4}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={value => handleChange(value, 4)}
          ref={input => setRef(input, 4)}
        />
        <TextInput
          placeholder="-"
          style={styles.tokenInput}
          value={char5}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={value => handleChange(value, 5)}
          ref={input => setRef(input, 5)}
        />
        <TextInput
          placeholder="-"
          style={styles.tokenInput}
          value={char6}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={value => handleChange(value, 6)}
          ref={input => setRef(input, 6)}
        />
      </View>
      <View style={styles.submitBtn}>
        <Button title="Submit" onPress={submitOtpToken} />
      </View>
    </View>
  );
};

export default AuthenticateTokenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 40,
  },
  tokenInput: {
    marginHorizontal: 5,
    paddingHorizontal: 15,
    textAlign: 'center',
    borderWidth: 1,
    fontSize: 30,
    marginTop: 50,
    marginBottom: 50,
  },
  submitBtn: {
    width: 100,
  },
});
