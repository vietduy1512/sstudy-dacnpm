import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';

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
      <Text style={styles.messageText}>Send notification to child</Text>
      <TextInput
        placeholder="Input your message"
        style={styles.messageInput}
        value={message}
        onChangeText={value => handleChange(value)}
      />
      <View style={styles.saveBtn}>
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChildNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 20,
  },
  messageInput: {
    marginTop: 50,
    padding: 15,
    width: '100%',
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  saveBtn: {
    marginTop: 50,
    width: 100,
  },
});
