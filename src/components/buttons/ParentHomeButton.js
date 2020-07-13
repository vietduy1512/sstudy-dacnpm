import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default function ParentHomeButton(props) {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 100,
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
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,
    // elevation: 10,
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
    color: '#a64d79',
    fontWeight: 'bold',
  },
});
