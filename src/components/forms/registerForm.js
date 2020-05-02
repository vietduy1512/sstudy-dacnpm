import React from 'react';
//import {useToasts} from 'react-toast-notifications';
import {TextInput, Button, View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Toast} from 'native-base';

import PasswordInput from './passwordInput';

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
  const showToast = title => {
    Toast.show({
      text: title,
      buttonText: 'Okay',
      // type: 'warning',
      // duration: 3000,
    });
  };

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
            showToast(props.errors.email);
          } else if (props.touched.fullname && props.errors.fullname) {
            showToast(props.errors.fullname);
          } else if (props.touched.password && props.errors.password) {
            showToast(props.errors.password);
          } else if (
            props.touched.confirmPassword &&
            props.errors.confirmPassword
          ) {
            showToast(props.errors.confirmPassword);
          } else {
            Toast.toastInstance._root.closeToast();
          }

          return (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                onBlur={props.handleBlur('email')}
              />
              <View style={styles.space} />
              <TextInput
                style={styles.input}
                placeholder="Full name"
                onChangeText={props.handleChange('fullname')}
                value={props.values.fullname}
                onBlur={props.handleBlur('fullname')}
              />
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
              <Button
                title="sign up"
                text="submit"
                onPress={props.handleSubmit}
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
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  space: {
    marginTop: 20,
  },
});
