import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Icon} from 'native-base';

export default function PasswordInput({placeholder, onChange, value, onBlur}) {
  const [icon, setIcon] = useState('eye-off');
  const [hide, setHide] = useState(true);

  const changeIcon = () => {
    setIcon(icon === 'eye' ? 'eye-off' : 'eye');
    setHide(!hide);
  };

  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.input}
        secureTextEntry={hide}
        onChangeText={e => onChange(e)}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
      />
      <Icon style={styles.searchIcon} name={icon} onPress={changeIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 18,
  },
});
