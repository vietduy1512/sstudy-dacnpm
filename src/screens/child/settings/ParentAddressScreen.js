import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {PARENT_ADDRESS, DEVICE_TOKEN} from 'constants/async-storage';
import axios from 'axios';

const ParentAddressScreen = () => {
  const [parentAddress, setParentAddress] = useState('');
  const [currentParentAddress, setCurrentParentAddress] = useState('');

  useEffect(() => {
    async function fetchData() {
      setCurrentParentAddress(await AsyncStorage.getItem(PARENT_ADDRESS));
    }
    fetchData();
  }, []);

  const handleChange = value => {
    setParentAddress(value);
  };

  const saveParentAddress = async () => {
    // TODO: check email valid with backend
    if (!parentAddress || parentAddress === '') {
      return;
    }
    await AsyncStorage.setItem(PARENT_ADDRESS, parentAddress);
    setCurrentParentAddress(parentAddress);
    setParentAddress('');
    let deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
    let response = await axios.post('/users/initChild', {
      parentEmailAddress: parentAddress,
      deviceToken: deviceToken,
    });
    if (response.status !== 200) {
      Alert.alert('Failed to update your information');
    }
  };

  return (
    <View style={styles.container}>
      {currentParentAddress && currentParentAddress !== '' ? (
        <Text style={styles.parentAddressText}>{currentParentAddress}</Text>
      ) : (
        <Text style={styles.emptyParentAddressText}>
          PARENT ADDRESS IS EMPTY
        </Text>
      )}
      <TextInput
        placeholder="Input your parent's email address"
        style={styles.parentAddressInput}
        value={parentAddress}
        onChangeText={value => handleChange(value)}
      />
      <View style={styles.saveBtn}>
        <Button title="Save" onPress={saveParentAddress} />
      </View>
    </View>
  );
};

export default ParentAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyParentAddressText: {
    color: 'gray',
    fontSize: 15,
  },
  parentAddressText: {
    fontSize: 20,
  },
  parentAddressInput: {
    marginTop: 50,
    padding: 15,
    width: '100%',
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  saveBtn: {
    marginTop: 50,
    width: 100,
  },
});
