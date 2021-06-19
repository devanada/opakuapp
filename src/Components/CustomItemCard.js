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

const CustomItemCard = ({
  image,
  productName,
  quantity,
  price,
  handleClick,
  location,
  sold,
}) => {
  return (
    <TouchableNativeFeedback onPress={handleClick}>
      <View style={cardStyle.cardContainer}>
        <Image style={cardStyle.image} source={{uri: image}} />
        <View style={{flex: 1}}>
          <Text style={cardStyle.productName}>
            {productName.length > 40
              ? productName.slice(0, 40).concat('...')
              : productName}
          </Text>
        </View>
        <Text style={cardStyle.quantity}>Stok: {quantity}</Text>
        <Text style={cardStyle.loker}>{location}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <NumberFormat
            value={price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp '}
            renderText={value => <Text style={cardStyle.price}>{value}</Text>}
          />
          <Text style={cardStyle.quantity}>Terjual: {sold}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const cardStyle = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    width: DEVICE.width / 2.4,
    height: DEVICE.height / 2.7,
    display: 'flex',
    flexDirection: 'column',
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
  },
  image: {
    width: DEVICE.width / 3,
    height: DEVICE.width / 3,
    alignSelf: 'center',
    borderRadius: 3,
  },
  productName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantity: {
    color: '#000',
    fontSize: 14,
    paddingTop: 5,
  },
  loker: {
    fontSize: 12,
    color: '#000',
  },
  price: {
    paddingTop: 5,
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
});

export default CustomItemCard;
