/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

const CustomButton2 = ({label, onPress, whichStyle, disabled, iconName}) => {
  const {
    buttonStyle,
    buttonStyle2,
    buttonText,
    buttonText2,
    iconStyle,
    iconStyle2,
  } = ButtonStyles;
  return (
    <TouchableOpacity
      style={whichStyle ? buttonStyle : buttonStyle2}
      onPress={onPress}
      disabled={disabled}>
      <Icon style={whichStyle ? iconStyle : iconStyle2} name={iconName} />
      <Text style={whichStyle ? buttonText : buttonText2}>{label}</Text>
    </TouchableOpacity>
  );
};

const ButtonStyles = {
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonStyle2: {
    borderRadius: 5,
    backgroundColor: '#82d2ee',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  buttonText2: {
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  iconStyle: {
    color: '#209C3A',
    alignSelf: 'center',
  },
  iconStyle2: {
    color: '#fff',
    alignSelf: 'center',
  },
};

export {CustomButton2};
