/* eslint-disable prettier/prettier */ /* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import NumberFormat from 'react-number-format';

const DEVICE = Dimensions.get('screen');

const CustomItemCard2 = ({image, price, handleClick}) => {
  return (
    // <TouchableNativeFeedback onPress={handleClick}>
    <View style={cardStyle.cardContainer}>
      <Image style={cardStyle.image} source={{uri: image}} />
      <NumberFormat
        value={price}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'Rp '}
        renderText={value => <Text style={cardStyle.price}>Total {value}</Text>}
      />
    </View>
    // </TouchableNativeFeedback>
  );
};

const cardStyle = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    width: DEVICE.width / 2.4,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
  },
  image: {
    width: DEVICE.width / 3,
    height: DEVICE.width / 3,
    alignSelf: 'center',
    borderRadius: 3,
  },
  price: {
    paddingTop: 5,
    fontSize: 16,
    color: '#000',
  },
});

export default CustomItemCard2;
