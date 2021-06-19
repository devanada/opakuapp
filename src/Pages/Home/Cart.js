/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import NumberFormat from 'react-number-format';

import {
  getCartUser,
  insertToCart,
  createOrder,
} from '../../Utils/Firebase/order';
import {CustomButton2} from '../../Components/CustomButton2';
import {CustomLoading} from '../../Components/CustomLoading';
import CardCart from '../../Components/CardCart';

const DEVICE = Dimensions.get('screen');

const Cart = props => {
  const {user} = props.route.params;
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(null);
  const [loc, setLoc] = useState(null);

  const getLocation = () => {
    Geolocation.getCurrentPosition(info => {
      setLoc(info.coords);
    });
  };

  useEffect(() => {
    const getCart = async () => {
      getCartUser(user.cartID).then(val => {
        if (val.error) {
          Alert.alert('Error get cart user', val.msg);
        }
        const totalSum = val.data.cart.reduce(function (cnt, o) {
          return cnt + +o.jumlah * +o.price;
        }, 0);
        setCart(val.data);
        setTotal(totalSum);
        setDone(true);
      });
    };
    getCart();
    getLocation();
  }, [user.cartID]);

  const handleIncrement = async item => {
    cart.cart.forEach((o, key) => {
      if (o.id === item.id) {
        cart.cart[key].jumlah += 1;
      }
    });
    const reg = await insertToCart(user.cartID, cart.cart);
    if (reg.error) {
      Alert.alert('Error', reg.msg);
    } else {
      getCartUser(user.cartID).then(val => {
        if (val.error) {
          Alert.alert('Error get cart user', val.msg);
        }
        const totalSum = val.data.cart.reduce(function (cnt, o) {
          return cnt + +o.jumlah * +o.price;
        }, 0);
        setCart(val.data);
        setTotal(totalSum);
      });
    }
  };

  const handleDecrement = async item => {
    cart.cart.forEach((o, key) => {
      if (o.id === item.id && o.jumlah > 1) {
        cart.cart[key].jumlah -= 1;
      }
    });
    const reg = await insertToCart(user.cartID, cart.cart);
    if (reg.error) {
      Alert.alert('Error', reg.msg);
    } else {
      getCartUser(user.cartID).then(val => {
        if (val.error) {
          Alert.alert('Error get cart user', val.msg);
        }
        const totalSum = val.data.cart.reduce(function (cnt, o) {
          return cnt + +o.jumlah * +o.price;
        }, 0);
        setCart(val.data);
        setTotal(totalSum);
      });
    }
  };

  const handleRemove = async item => {
    const removeCart = cart.cart.filter(o => o.id !== item.id);
    const reg = await insertToCart(user.cartID, removeCart);
    if (reg.error) {
      Alert.alert('Error', reg.msg);
    } else {
      getCartUser(user.cartID).then(val => {
        if (val.error) {
          Alert.alert('Error get cart user', val.msg);
        }
        const totalSum = val.data.cart.reduce(function (cnt, o) {
          return cnt + +o.jumlah * +o.price;
        }, 0);
        setCart(val.data);
        setTotal(totalSum);
      });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const reg = await createOrder(cart.cart, total, loc, user.id, user.cartID);
    if (reg.error) {
      Alert.alert('error', reg.msg);
    } else {
      Alert.alert('Success', reg.msg);
      props.navigation.goBack();
    }
    setIsLoading(false);
  };

  if (done) {
    return (
      <>
        <View style={styles.container}>
          {cart.cart.length > 0 ? (
            <FlatList
              data={cart.cart}
              renderItem={({item}) => (
                <CardCart
                  item={item}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleRemove={handleRemove}
                />
              )}
              keyExtractor={item => item.id.toString()}
              onEndReachedThreshold={0.5}
              initialNumToRender={10}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Icon name="emoticon-cry-outline" size={80} color="red" />
              <Text style={styles.emptyText}>Keranjang Kosong</Text>
            </View>
          )}
          <View style={styles.totalContainer}>
            <View style={styles.totalCol}>
              <Text style={styles.totalText}>
                {total === null ? '' : 'Total'}
              </Text>
              <NumberFormat
                value={total}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp '}
                renderText={value => (
                  <Text style={styles.totalNum}>
                    {value === null ? '' : value}
                  </Text>
                )}
              />
            </View>
            <View style={styles.totalCol}>
              <CustomButton2
                label="Checkout"
                onPress={() => {
                  if (total > 0) {
                    handleSubmit();
                  } else {
                    Alert.alert('Keranjang', 'Masukan barang terlebih dahulu');
                  }
                }}
              />
            </View>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <>
        <CustomLoading visible={true} text={'Loading'} />
      </>
    );
  }
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  totalContainer: {
    width: DEVICE.width,
    height: DEVICE.height / 9,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  totalCol: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  totalText: {
    color: '#636363',
    fontSize: 12,
  },
  totalNum: {
    color: '#82d2ee',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#75cfb8',
    alignSelf: 'center',
    height: DEVICE.height / 12,
    width: DEVICE.width / 2.3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: DEVICE.width / 1.1,
    height: DEVICE.height / 1.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 30,
    color: '#454545',
  },
});
