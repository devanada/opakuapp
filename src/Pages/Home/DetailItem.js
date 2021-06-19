/* eslint-disable prettier/prettier */ /* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import NumberFormat from 'react-number-format';

import {insertToCart} from '../../Utils/Firebase/order';
import {getCartUser} from '../../Utils/Firebase/order';
import {CustomButton2} from '../../Components/CustomButton2';
import {CustomLoading} from '../../Components/CustomLoading';

const DEVICE = Dimensions.get('screen');

const DetailItem = props => {
  const {data, user} = props.route.params;
  const [done, setDone] = useState(false);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const getCart = async () => {
      getCartUser(user.cartID).then(val => {
        if (val.error) {
          Alert.alert('Error get history chat', val.msg);
        }
        setCart(val.data);
        setDone(true);
      });
    };
    getCart();
  }, [user.cartID]);

  const insertCart = async () => {
    await analytics().logEvent('cart', {
      id: data.id,
      item: data.name,
      description: data.description,
      type: data.type,
    });
    if (!cart.cart.some(i => i.id === data.id)) {
      cart.cart.push({...data, jumlah: 1});
    } else {
      cart.cart.forEach(i => (i.id === data.id ? (i.jumlah += 1) : null));
    }
    const reg = await insertToCart(user.cartID, cart.cart);
    if (reg.error) {
      Alert.alert('Error', reg.msg);
    } else {
      getCartUser(user.cartID).then(val => {
        if (val.error) {
          Alert.alert('Error get history chat', val.msg);
        }
        setCart(val.data);
      });
      Alert.alert('Success', reg.msg);
    }
  };

  if (done) {
    return (
      <>
        <View style={styles.container}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.container2}>
              <Image
                style={styles.image}
                source={{uri: data.image}}
                resizeMode="contain"
              />
            </View>
            <View style={{flex: 1, paddingHorizontal: 10}}>
              <View style={{marginBottom: 10}}>
                <Text style={styles.text1}>{data.name}</Text>
                <View style={styles.container3}>
                  <NumberFormat
                    value={data.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp '}
                    renderText={value => (
                      <Text style={styles.text2}>{value}</Text>
                    )}
                  />
                  <Text style={styles.text3}>Terjual {data.sold}</Text>
                </View>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.text2}>{data.description}</Text>
              </View>
            </View>
          </ScrollView>
          <CustomButton2
            label="Masukkan Keranjang"
            onPress={() => insertCart()}
          />
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

export default DetailItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
    width: DEVICE.width,
    height: DEVICE.height / 3,
    backgroundColor: '#fff',
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: DEVICE.width,
    height: DEVICE.height / 3,
  },
  text1: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text2: {
    color: '#000',
    fontSize: 16,
  },
  text3: {
    color: '#000',
    fontSize: 14,
  },
});
