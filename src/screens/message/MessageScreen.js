import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';

import ChatLineHolder from 'components/message/ChatLineHolder';

export default function MessageScreen() {
  const [chatData, setChatData] = useState([
    {id: '1', sender: 'me', chatContent: 'Xin chào'},
    {id: '2', sender: 'your friend', chatContent: 'Chào cậu'},
  ]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    setChatData([
      ...chatData,
      {id: Math.random().toString(), sender: 'me', chatContent: message},
    ]);
    setMessage('');
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        imageStyle={styles.imgStyle}
        source={require('assets/images/bg-3.jpg')}
        style={styles.bg}>
        <FlatList
          keyExtractor={item => item.id}
          data={chatData}
          renderItem={({item}, index) =>
            item.sender === 'me' ? (
              <View style={styles.right}>
                <ChatLineHolder
                  sender={item.sender}
                  chatContent={item.chatContent}
                />
              </View>
            ) : (
              <ChatLineHolder
                sender={item.sender}
                chatContent={item.chatContent}
              />
            )
          }
        />
      </ImageBackground>
      <View style={{flex: 1 / 10}}>
        <View style={styles.input}>
          <View style={{flex: 9 / 10}}>
            <TextInput
              placeholder="Nhập nội dung chat"
              value={message}
              onChangeText={text => setMessage(text)}
              style={styles.txtInput}
            />
          </View>
          <View style={{flex: 1 / 10}}>
            <TouchableOpacity onPress={sendMessage}>
              <Text style={styles.btnSend}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column', justifyContent: 'flex-end'},
  imgStyle: {opacity: 0.5},
  bg: {
    flex: 9 / 10,
    backgroundColor: '#A5A5A5',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  right: {alignItems: 'flex-end'},
  input: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 2,
  },
  txtInput: {height: 100, fontSize: 18},
  btnSend: {color: '#0099ff', fontSize: 14, marginRight: 15},
});
