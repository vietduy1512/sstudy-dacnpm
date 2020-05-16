import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';

const SquareButton = props => {
  return (
    <TouchableOpacity style={styles.item} onPress={props.onPress}>
      <View style={styles.imageContainer}>
        <Image source={props.image} style={styles.image} />
      </View>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default SquareButton;

const styles = StyleSheet.create({
  item: {
    marginTop: 20,
    marginHorizontal: 10,
    width: 150,
    height: 130,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
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
    height: 100,
    width: 150,
    paddingHorizontal: 2,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  title: {
    fontSize: 17,
  },
});
