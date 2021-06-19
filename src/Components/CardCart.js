/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NumberFormat from 'react-number-format';

const DEVICE = Dimensions.get('screen');

const CardTop = ({item, handleIncrement, handleDecrement, handleRemove}) => {
  return (
    <View style={cardStyle.container}>
      <View style={cardStyle.left}>
        <Image style={cardStyle.image} source={{uri: item.image}} />
      </View>
      <View style={cardStyle.right}>
        <Text style={cardStyle.nama}>
          {item.name.length > 40
            ? item.name.slice(0, 40).concat('...')
            : item.name}
        </Text>
        <View style={cardStyle.quantity}>
          <TouchableWithoutFeedback onPress={() => handleDecrement(item)}>
            <View style={cardStyle.plusMin}>
              <Icon name="minus-circle" size={30} color="#fff" />
            </View>
          </TouchableWithoutFeedback>
          <Text style={cardStyle.quantityText}>{item.jumlah}</Text>
          <TouchableWithoutFeedback onPress={() => handleIncrement(item)}>
            <View style={cardStyle.plusMin}>
              <Icon name="plus-circle" size={30} color="#fff" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <NumberFormat
          value={item.price * item.jumlah}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rp '}
          renderText={value => <Text style={cardStyle.price}>{value}</Text>}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => handleRemove(item)}>
        <View style={cardStyle.remove}>
          <Icon name="delete" size={28} color={'#82d2ee'} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CardTop;

const cardStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#82d2ee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    height: DEVICE.height / 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  left: {
    marginHorizontal: 10,
  },
  right: {
    flex: 1,
    padding: 10,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  plusMin: {
    width: DEVICE.width / 10,
    height: DEVICE.width / 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  nama: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  price: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  remove: {
    width: DEVICE.width / 9,
    height: DEVICE.width / 9,
    borderRadius: DEVICE.width / 9 / 2,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});
