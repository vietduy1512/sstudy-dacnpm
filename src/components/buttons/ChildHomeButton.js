import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default function ChildHomeButton(props) {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 120,
      }}>
      <TouchableOpacity style={styles.btn} onPress={props.onPress}>
        <View style={styles.imageContainer}>
          <Image source={props.image} style={styles.image} />
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    marginHorizontal: 10,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderWidth: 1,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 35,
  },
  image: {
    flex: 1,
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 17,
    marginHorizontal: 5,
    textAlign: 'center',
    color: 'slateblue',
    fontWeight: 'bold',
  },
});
