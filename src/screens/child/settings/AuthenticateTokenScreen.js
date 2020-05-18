import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {PARENT_ID, DEVICE_TOKEN} from 'constants/async-storage';
import {HOME} from 'constants';

const AuthenticateTokenScreen = props => {
  const [token, setToken] = useState('');

  const handleChange = value => {
    setToken(value);
  };

  const submitOtpToken = async () => {
    let response = await axios.post('/auth/validateOTP', {token: token});
    if (response.status !== 200) {
      Alert.alert('Failed to update your information');
      return;
    }
    await initChild(response.data.parentId);
  };

  const initChild = async parentId => {
    await AsyncStorage.setItem(PARENT_ID, parentId.toString());
    let deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
    let response = await axios.post('/users/initChild', {
      parentId: parentId,
      deviceToken: deviceToken,
    });
    if (response.status !== 200) {
      Alert.alert('Failed to update your information');
    }
    console.log(deviceToken);
    console.log(parentId);
    props.navigation.navigate(HOME);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Input your OTP"
        style={styles.tokenInput}
        value={token}
        onChangeText={value => handleChange(value)}
      />
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
  tokenInput: {
    marginTop: 50,
    padding: 15,
    width: '100%',
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 40,
  },
  submitBtn: {
    marginTop: 50,
    width: 100,
  },
});
