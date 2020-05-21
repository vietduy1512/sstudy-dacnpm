import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Icon} from 'native-base';
import IconFeather from 'react-native-vector-icons/Feather';

export default function PasswordInput({placeholder, onChange, value, onBlur}) {
  const [icon, setIcon] = useState('eye-off');
  const [hide, setHide] = useState(true);

  const changeIcon = () => {
    setIcon(icon === 'eye' ? 'eye-off' : 'eye');
    setHide(!hide);
  };

  return (
    <View style={styles.searchSection}>
      <IconFeather
        name="lock"
        size={24}
        color="gray"
        style={styles.inlineIcon}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={hide}
        onChangeText={e => onChange(e)}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
      />
      {value !== '' && (
        <Icon style={styles.searchIcon} name={icon} onPress={changeIcon} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ddd',
    // borderRadius: 6,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 45,
    backgroundColor: '#fff',
    height: 45,
  },
  searchIcon: {
    paddingRight: 10,
    color: 'gray',
  },
  input: {
    flex: 1,
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
