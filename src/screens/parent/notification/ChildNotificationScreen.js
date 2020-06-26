import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import LoginButton from '../../../components/buttons/LoginButton';

const ChildNotificationScreen = ({navigation}) => {
  const [message, setMessage] = useState('');

  const handleChange = value => {
    setMessage(value);
  };

  const sendMessage = async () => {
    try {
      await axios.post('/notification/sendNotificationToChild', {
        content: message,
      });
      Alert.alert('Send message successfully');
    } catch (error) {
      Alert.alert('Failed to send notification to child');
      console.log(error);
    }
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send notification to child</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder="Write your message"
        style={styles.messageInput}
        value={message}
        onChangeText={value => handleChange(value)}
      />
      <View style={styles.saveBtn}>
        <LoginButton title="Send" onPress={sendMessage} />
      </View>
      <Image style={styles.logo} source={require('assets/images/bg-2.jpg')} />
    </View>
  );
};

export default ChildNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
    color: '#a64d79',
    fontWeight: 'bold'
  },
  messageInput: {
    maxHeight: 120,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  saveBtn: {
    marginTop: 20,
    width: '100%',
  },
  logo: {
    flex: 1,
    position: 'absolute',
    width: 450,
    height: 700,
    zIndex: -1,
  },
});
