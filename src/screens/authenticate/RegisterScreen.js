import React, {useState} from 'react';
//import {useToasts} from 'react-toast-notifications';
import axios from 'axios';
import {
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

const RegisterScreen = props => {
  //const {addToast} = useToasts();

  const [form, setForm] = useState({
    email: '',
    fullname: '',
    password: '',
    confirmPassword: '',
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
      .post('/auth/register', form)
      .then(response => {
        if (!response.data.errmsg) {
          //setRedirectTo('/login');
          // addToast('Register successfully!', {
          //   appearance: 'success',
          //   autoDismiss: true,
          // });
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
    <ScrollView contentContainerStyle={styles.container}>
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
        <Text>Fullname</Text>
        <TextInput
          placeholder="Input your fullname"
          style={styles.textInput}
          value={form.fullname}
          onChangeText={value => handleChange('fullname', value)}
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
      <View style={styles.section}>
        <Text>Confirm password</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Confirm your password"
          style={styles.textInput}
          value={form.confirmPassword}
          onChangeText={value => handleChange('confirmPassword', value)}
        />
      </View>
      <View style={styles.submit}>
        <Button title="Register" onPress={handleSubmit} />
      </View>
      <View style={styles.errorMessage}>
        {errorMessage.map(msg => (
          <Text style={styles.errorText}>{msg}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

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
  errorMessage: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#FF0000',
  },
});
