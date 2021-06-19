/* eslint-disable prettier/prettier */ /* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Item, Input, Label, Icon} from 'native-base';

const CustomTextInput = ({
  value,
  onChangeText,
  label,
  onSubmitEditing,
  getRef,
  onPress,
  onPress2,
  returnKeyType,
  keyboardType,
  editable,
  secureTextEntry,
  iconName,
  iconName2,
  whichStyle,
  defaultValue,
  multiline,
}) => {
  const {itemStyle1, itemStyle2, textInput, floatingLabel} = InputFieldStyles;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Item
      floatingLabel
      style={whichStyle ? itemStyle2 : itemStyle1({isFocused})}
      onPress={onPress2}>
      <Icon
        style={{marginLeft: 10, color: '#8B8B8B'}}
        name={iconName2}
        type={'MaterialCommunityIcons'}
      />
      <Label style={floatingLabel}>{label}</Label>
      <Input
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        style={textInput}
        blurOnSubmit={false}
        getRef={getRef}
        value={value}
        defaultValue={defaultValue}
        editable={editable}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
      <Icon style={{color: '#8B8B8B'}} name={iconName} onPress={onPress} />
    </Item>
  );
};

const InputFieldStyles = {
  textInput: {
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Calibre_Regular',
  },
  floatingLabel: {
    marginLeft: 10,
    marginTop: 8,
    fontFamily: 'Calibre_Regular',
  },
  itemStyle1: ({isFocused}) => ({
    marginTop: 10,
    marginLeft: 0,
    backgroundColor: '#FFF',
    borderColor: isFocused ? '#82d2ee' : '#8B8B8B',
    borderBottomWidth: 3,
  }),
  itemStyle2: {
    marginTop: 10,
    marginLeft: 0,
    backgroundColor: '#F6F7FC',
    borderBottomWidth: 3,
  },
  itemStyle3: {
    marginLeft: 0,
    backgroundColor: '#FFF',
    borderColor: '#6852E1',
    borderBottomWidth: 3,
  },
};

export {CustomTextInput};
