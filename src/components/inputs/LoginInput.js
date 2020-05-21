import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class LoginInput extends Component {
  render() {
    return (
      <View style={styles.inputWrapper}>
        <Icon name={this.props.iconName} size={24} color="gray" style={styles.inlineIcon}/>
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={this.props.keyboardType}
          returnKeyType={this.props.returnKeyType}
          onSubmitEditing={this.props.onSubmitEditing}
          blurOnSubmit={this.props.blurOnSubmit}
          onChangeText={this.props.onChangeText}
          ref={this.props.reference}
          value={this.props.value}
        />
      </View>
    );
  }
}

LoginInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  blurOnSubmit: PropTypes.bool,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
};

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    marginTop: 5
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 45,
    backgroundColor: "white"
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
