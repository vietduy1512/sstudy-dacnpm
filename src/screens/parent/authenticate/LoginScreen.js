/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
//import {useToasts} from 'react-toast-notifications';
import {connect} from 'react-redux';
import {login} from 'actions/appAction';
import axios from 'axios';
import {Text, TextInput, Button, View, StyleSheet} from 'react-native';

const LoginScreen = props => {
  //const {addToast} = useToasts();

  const [form, setForm] = useState({
    email: 'admin@gmail.com',
    password: '123456',
  });
  const [errorMessage, setErrorMessage] = useState([]);
  //const [redirectTo, setRedirectTo] = useState(null);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('/auth/login', form)
      .then(response => {
        if (response.status === 200) {
          let user = response.data;
          props.login(user);
          //setRedirectTo('/');
          // addToast('Login successfully!', {
          //   appearance: 'success',
          //   autoDismiss: true,
          // });
          props.navigation.navigate('Home');
        }
      })
      .catch(error => {
        console.log(error);
        // TODO
        if (
          !error.response ||
          !error.response.data ||
          !error.response.data ||
          !error.response.data.errors
        ) {
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
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>Email</Text>
        <TextInput
          placeholder="Input your email"
          style={styles.textInput}
          value={form.email}
          onChangeText={value => handleChange('email', value)}
        />
      </View>
      <View style={styles.section}>
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Input your password"
          style={styles.textInput}
          value={form.password}
          onChangeText={value => handleChange('password', value)}
        />
      </View>
      <View style={styles.submit}>
        <Button title="Login" onPress={handleSubmit} />
      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        {errorMessage.map(msg => (
          <Text style={{color: 'red'}}>{msg}</Text>
        ))}
      </View>
    </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
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
});
