/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

const CustomButton = ({label, onPress, whichStyle, disabled, iconName}) => {
  const {buttonStyle, buttonText, buttonStyle2, buttonText2, iconStyle} =
    ButtonStyles;
  return (
    <TouchableOpacity
      style={whichStyle ? buttonStyle2 : buttonStyle}
      onPress={onPress}
      disabled={disabled}>
      <Icon style={iconStyle} name={iconName} />
      <Text style={whichStyle ? buttonText2 : buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const ButtonStyles = {
  buttonStyle: {
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#82d2ee',
  },
  buttonStyle2: {
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#BDBDBD',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
    color: '#82d2ee',
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
    color: '#fff',
    alignSelf: 'center',
  },
};

export {CustomButton};
