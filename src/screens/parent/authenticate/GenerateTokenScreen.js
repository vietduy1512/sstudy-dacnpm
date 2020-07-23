import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, Alert} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import LoginButton from '../../../components/buttons/LoginButton';
import QRCode from 'react-native-qrcode-svg';

const GenerateTokenScreen = props => {
  const [otpToken, setOtpToken] = useState(null);
  const [QRCodeValue, setQRCodeValue] = useState('Not available');

  useEffect(() => {
    requestOTP();
  }, []);

  const requestOTP = async () => {
    try {
      let response = await axios.get('/auth/generateOTP');
      setOtpToken(response.data.token);
      setQRCodeValue(response.data.token);
    } catch (error) {
      Alert.alert('Failed to generate token', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your OTP Code</Text>
        </View>
        <Text style={styles.code}>{otpToken}</Text>
        <QRCode size={150} value={QRCodeValue} />
        <View style={{width: '100%', marginTop: 10}}>
          <LoginButton title="GENERATE NEW OTP" onPress={requestOTP} />
        </View>
      </View>
      <Image style={styles.logo} source={require('assets/images/bg-2.jpg')} />
    </View>
  );
};

const mapStateToProps = state => ({
  currentUser: state.app.user,
});

export default connect(
  mapStateToProps,
  {},
)(GenerateTokenScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    width: 300,
    maxHeight: 500,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  logo: {
    flex: 1,
    position: 'absolute',
    width: 450,
    height: 700,
    zIndex: -1,
  },
  titleContainer: {
    position: 'absolute',
    top: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#a64d79',
  },
  code: {
    fontSize: 40,
    marginTop: 60,
  },
});
