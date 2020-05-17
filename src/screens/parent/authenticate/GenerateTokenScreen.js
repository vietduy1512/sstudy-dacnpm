import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';

const GenerateTokenScreen = props => {
  const [otpToken, setOtpToken] = useState(null);

  useEffect(() => {
    requestOTP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestOTP = async () => {
    let response = await axios.get('/auth/generateOTP');
    if (response.status !== 200) {
      Alert.alert('Failed to generate token');
    }
    console.log(response.data);
    setOtpToken(response.data.token);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your OTP Code</Text>
        </View>
        <Text style={styles.code}>{otpToken}</Text>
        <TouchableOpacity style={styles.copyBtn} onPress={requestOTP}>
          <Text>GENERATE NEW</Text>
        </TouchableOpacity>
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
    marginVertical: 100,
    marginHorizontal: 20,
    justifyContent: 'center',
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
  },
  code: {
    fontSize: 40,
    marginBottom: 20,
  },
  copyBtn: {
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    padding: 10,
  },
});
