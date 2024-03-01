import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Button = ({ title, onPress, icon, color,style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button,style]}>
      <Text style={styles.text}>{title}</Text>
      <Entypo name={icon} size={40} color={color ? color : '#302e2e'}/>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#353435',
  },
});
