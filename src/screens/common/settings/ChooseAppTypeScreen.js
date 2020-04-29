import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {APP_TYPE} from 'constants/async-storage';
import {AppType} from 'constants/app';

const ParentAddressScreen = () => {
  const [appType, setAppType] = useState('');

  useEffect(() => {
    async function fetchData() {
      let type = await AsyncStorage.getItem(APP_TYPE);
      setAppType(parseInt(type, 10));
    }
    fetchData();
  }, []);

  const saveAppType = async type => {
    await AsyncStorage.setItem(APP_TYPE, type.toString());
    setAppType(type);
  };

  return (
    <View style={styles.container}>
      {appType === AppType.PARENT || appType === AppType.CHILD ? (
        <Text style={styles.appTypeText}>
          Current app type: {appType ? 'Child' : 'Parent'}
        </Text>
      ) : (
        <Text style={styles.emptyAppTypeText}>Choose your app type</Text>
      )}
      <View style={styles.btn}>
        <Button title="Parent" onPress={() => saveAppType(AppType.PARENT)} />
      </View>
      <View style={styles.btn}>
        <Button title="Child" onPress={() => saveAppType(AppType.CHILD)} />
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
  emptyAppTypeText: {
    color: 'gray',
    fontSize: 15,
  },
  appTypeText: {
    fontSize: 20,
  },
  btn: {
    marginTop: 20,
    width: 100,
  },
});
