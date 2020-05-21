import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

const MARGIN = 40;

export default class ButtonSubmit extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.props.onPress}
        activeOpacity={0.7}>
        {this.props.isLoading ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <Text style={styles.text}>{this.props.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a64d79',
    height: MARGIN,
    borderRadius: 20,
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
