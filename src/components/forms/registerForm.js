import React from 'react';
//import {useToasts} from 'react-toast-notifications';
import {TextInput, View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';

import PasswordInput from './passwordInput';
import LoginButton from 'components/buttons/LoginButton';

const registerSchema = yup.object({
  email: yup
    .string()
    .required()
    .email(),
  fullname: yup.string().required(),
  password: yup
    .string()
    .required()
    .min(4),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function registerFrom({handleRegister}) {
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={registerSchema}
        initialValues={{
          email: '',
          fullname: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={values => {
          handleRegister(values);
        }}>
        {props => {
          if (props.touched.email && props.errors.email) {
            Toast.show(props.errors.email);
          } else if (props.touched.fullname && props.errors.fullname) {
            Toast.show(props.errors.fullname);
          } else if (props.touched.password && props.errors.password) {
            Toast.show(props.errors.password);
          } else if (
            props.touched.confirmPassword &&
            props.errors.confirmPassword
          ) {
            Toast.show(props.errors.confirmPassword);
          } else {
          }
          return (
            <View>
              <View>
                <Icon
                  name="mail"
                  size={24}
                  color="gray"
                  style={styles.inlineIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  onBlur={props.handleBlur('email')}
                />
              </View>
              <View style={styles.space} />
              <View>
                <Icon
                  name="user"
                  size={24}
                  color="gray"
                  style={styles.inlineIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Full name"
                  onChangeText={props.handleChange('fullname')}
                  value={props.values.fullname}
                  onBlur={props.handleBlur('fullname')}
                />
              </View>
              <View style={styles.space} />
              <PasswordInput
                placeholder="Password"
                onChange={props.handleChange('password')}
                value={props.values.password}
                onBlur={props.handleBlur('password')}
              />
              <View style={styles.space} />
              <PasswordInput
                placeholder="Confirm password"
                onChange={props.handleChange('confirmPassword')}
                value={props.values.confirmPassword}
                onBlur={props.handleBlur('confirmPassword')}
              />

              <View style={styles.space} />
              <LoginButton
                title="Register"
                onPress={props.handleSubmit}
                isLoading={false}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleText: {
    fontFamily: 'oswald-bold',
    fontSize: 18,
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 45,
    backgroundColor: '#Fff',
    // borderWidth: 1,
    // borderColor: '#ddd',
    // padding: 10,
    // fontSize: 18,
    // borderRadius: 6,
  },
  space: {
    marginTop: 20,
  },
  inlineIcon: {
    position: 'absolute',
    zIndex: 99,
    width: 24,
    height: 24,
    left: 15,
    top: 8,
  },
});
