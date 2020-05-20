import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {APP_TYPE} from 'constants/async-storage';
import {AppType} from 'constants/app';
import {updateAppType} from 'actions/appAction';
import {connect} from 'react-redux';

const ChooseAppTypeScreen = props => {
  useEffect(() => {
    props.updateAppType();
  }, [props]);

  const saveAppType = async type => {
    await AsyncStorage.setItem(APP_TYPE, type.toString());
    props.updateAppType();
  };

  return (
    <View style={styles.container}>
      {props.appType === AppType.PARENT || props.appType === AppType.CHILD ? (
        <Text style={styles.appTypeText}>
          Current app type: {props.appType ? 'Child' : 'Parent'}
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

const mapStateToProps = state => ({
  appType: state.app.type,
});

export default connect(
  mapStateToProps,
  {updateAppType},
)(ChooseAppTypeScreen);

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
