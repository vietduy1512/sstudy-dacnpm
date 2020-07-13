import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {APP_TYPE} from 'constants/async-storage';
import {AppType} from 'constants/app';
import {updateAppType} from 'actions/appAction';
import {connect} from 'react-redux';
import bgSrc from 'assets/images/app-type-bg.jpg';

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
      <View style={styles.btnBg}>
        {props.appType === AppType.PARENT || props.appType === AppType.CHILD ? (
          <Text style={styles.appTypeText}>
            Current app type:{' '}
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: props.appType ? 'slateblue' : '#a64d79',
              }}>
              {props.appType ? 'Child' : 'Parent'}
            </Text>
          </Text>
        ) : (
          <Text style={styles.emptyAppTypeText}>Choose your app type</Text>
        )}
        <TouchableOpacity
          style={{...styles.btn, backgroundColor: '#a64d79'}}
          onPress={() => saveAppType(AppType.PARENT)}>
          <Text style={styles.btnContent}>PARENT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.btn, backgroundColor: 'slateblue'}}
          onPress={() => saveAppType(AppType.CHILD)}>
          <Text style={styles.btnContent}>CHILD</Text>
        </TouchableOpacity>
      </View>
      <Image style={styles.logo} source={bgSrc} />
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
  btnBg: {
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'slateblue',
    borderWidth: 3,
  },
  emptyAppTypeText: {
    color: 'gray',
    fontSize: 15,
  },
  appTypeText: {
    fontSize: 18,
  },
  btnContent: {
    color: 'white',
    fontSize: 16,
  },
  btn: {
    marginTop: 20,
    width: 200,
    height: 40,
    backgroundColor: 'slateblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  logo: {
    flex: 1,
    position: 'absolute',
    width: 450,
    height: 700,
    zIndex: -1,
  },
});
