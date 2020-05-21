import React, {useState} from 'react';
//import {useToasts} from 'react-toast-notifications';
import axios from 'axios';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import RegisterForm from 'components/forms/registerForm';
import {LOGIN} from 'constants/navigation';
import LoginWallpaper from 'components/wallpapers/LoginWallpaper';
import bgSrc from 'assets/images/bg-4.jpg';

const RegisterScreen = props => {
  //const {addToast} = useToasts();

  // const [form, setForm] = useState({
  //   email: '',
  //   fullname: '',
  //   password: '',
  //   confirmPassword: '',
  // });
  const [errorMessage, setErrorMessage] = useState([]);
  //const [redirectTo, setRedirectTo] = useState(null);

  // const handleChange = (name, value) => {
  //   setForm({
  //     ...form,
  //     [name]: value,
  //   });
  // };

  const handleRegister = values => {
    console.log(values);
    // axios
    //   .post('/auth/register', values)
    //   .then(response => {
    //     if (!response.data.errmsg) {
    //       //setRedirectTo('/login');
    //       // addToast('Register successfully!', {
    //       //   appearance: 'success',
    //       //   autoDismiss: true,
    //       // });
    //       props.navigation.navigate('Login');
    //     } else {
    //       setErrorMessage(['Email is already taken']);
    //     }
    //   })
    //   .catch(error => {
    //     if (!error.response || !error.response.data) {
    //       setErrorMessage(['Something went wrong']);
    //       return;
    //     }

    //     switch (error.response.status) {
    //       case 401:
    //         setErrorMessage(error.response.data.errors.map(err => err.msg));
    //         break;
    //       case 400:
    //         setErrorMessage(error.response.data.errors.map(err => err.msg));
    //         break;
    //       default:
    //         break;
    //     }
    //   });
  };

  return (
    <LoginWallpaper bgSrc={bgSrc}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Create an account</Text>
          <RegisterForm handleRegister={handleRegister} />
          <View style={styles.errorMessage}>
            {errorMessage.map(msg => (
              <Text style={styles.errorText}>{msg}</Text>
            ))}
          </View>
          <View style={styles.conPolicy}>
            <Text style={styles.policy}>
              By sign up, you agree with the{' '}
              <Text style={styles.term_service}>Terms of Service</Text> and{' '}
              <Text style={styles.term_service}>Privacy Policy</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate(LOGIN)}>
            <View style={styles.login}>
              <Text style={styles.txtLogin}>Already have an account?</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LoginWallpaper>

    // <ScrollView contentContainerStyle={styles.container}>
    //   <View style={styles.section}>
    //     <Text>Email</Text>
    //     <TextInput
    //       placeholder="Input your email"
    //       style={styles.textInput}
    //       value={form.email}
    //       onChangeText={value => handleChange('email', value)}
    //     />
    //   </View>
    //   <View style={styles.section}>
    //     <Text>Fullname</Text>
    //     <TextInput
    //       placeholder="Input your fullname"
    //       style={styles.textInput}
    //       value={form.fullname}
    //       onChangeText={value => handleChange('fullname', value)}
    //     />
    //   </View>
    //   <View style={styles.section}>
    //     <Text>Password</Text>
    //     <TextInput
    //       secureTextEntry={true}
    //       placeholder="Input your password"
    //       style={styles.textInput}
    //       value={form.password}
    //       onChangeText={value => handleChange('password', value)}
    //     />
    //   </View>
    //   <View style={styles.section}>
    //     <Text>Confirm password</Text>
    //     <TextInput
    //       secureTextEntry={true}
    //       placeholder="Confirm your password"
    //       style={styles.textInput}
    //       value={form.confirmPassword}
    //       onChangeText={value => handleChange('confirmPassword', value)}
    //     />
    //   </View>
    //   <View style={styles.submit}>
    //     <Button title="Register" onPress={handleSubmit} />
    //   </View>
    //   <View style={styles.errorMessage}>
    //     {errorMessage.map(msg => (
    //       <Text style={styles.errorText}>{msg}</Text>
    //     ))}
    //   </View>
    // </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
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
    marginTop: 10,
  },
  errorText: {
    color: '#FF0000',
  },
  conPolicy: {
    marginTop: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#222',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  policy: {
    fontSize: 17,
  },
  term_service: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  login: {
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#222',
    padding: 10,
    borderRadius: 4,
  },
  txtLogin: {
    alignSelf: 'center',
  },
});
