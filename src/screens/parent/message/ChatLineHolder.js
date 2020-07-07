import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ChatLineHolder({sender, chatContent}) {
  return (
    <View style={styles.container}>
      <Text style={styles.tagName}>{sender}</Text>
      <Text>{chatContent}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '50%',
    alignItems: 'flex-start',
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  tagName: {
    color: '#a64d79',
    marginBottom: 5,
  },
});
