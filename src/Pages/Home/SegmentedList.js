/* eslint-disable prettier/prettier */ /* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header, Item, Input, Icon, Badge} from 'native-base';

import {getItemByType} from '../../Utils/Firebase/item';
import {getCartUser} from '../../Utils/Firebase/order';
import CustomItemCard from '../../Components/CustomItemCard';
import {CustomLoading} from '../../Components/CustomLoading';

const DEVICE = Dimensions.get('screen');

const SegmentedList = props => {
  const type = props.route.params.type;
  const [data, setData] = useState([]);
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});
  const [done, setDone] = useState(false);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const getData = async () => {
      const datas = await getItemByType({type});
      if (datas.error) {
        return Alert.alert('Get Data Error');
      }
      let newData = [...datas.data];
      setData(newData);
    };
    getData();
  }, [type]);

  useEffect(() => {
    const getCart = async () => {
      const userToken = await AsyncStorage.getItem('UserLogin');
      const userData = JSON.parse(userToken);
      setUser(userData);
      getCartUser(userData.cartID).then(val => {
        if (val.error) {
          Alert.alert('Error get history chat', val.msg);
        }
        setCart(val.data);
        setDone(true);
      });
    };
    getCart();
  }, []);

  if (done) {
    return (
      <>
        <View style={styles.container}>
          <Header
            searchBar
            rounded
            transparent
            iosBarStyle={'dark-content'}
            androidStatusBarColor={'#000'}
            style={{alignItems: 'center'}}>
            <Icon
              name="arrow-back-outline"
              style={{marginRight: 20}}
              onPress={() => props.navigation.goBack()}
            />
            <Item
              style={[styles.border, {borderColor: '#0f4c75'}]}
              onPress={() =>
                props.navigation.navigate('Search', {
                  data: user,
                })
              }>
              <Icon name="ios-search" />
              <Input placeholder="Search" disabled />
            </Item>
            <Item style={{flex: 0}}>
              <Icon
                name="cart"
                style={{color: 'black'}}
                // onPress={() => testPost()}
                onPress={() => console.log('test2')}
              />
              {cart.cart.length !== 0 && (
                <Badge
                  style={{
                    position: 'absolute',
                    right: 0,
                  }}>
                  <Text style={{color: 'white'}}>{cart.cart.length}</Text>
                </Badge>
              )}
            </Item>
          </Header>
          <View style={styles.container3}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              horizontal={false}
              numColumns={2}
              renderItem={({item}) => (
                <View>
                  <CustomItemCard
                    id={item.id}
                    image={item.image}
                    handleClick={() => {
                      // handleClick(item);
                    }}
                    price={item.price}
                    location={item.location}
                    productName={item.name}
                    quantity={item.qty}
                    sold={item.sold}
                  />
                </View>
              )}
              keyExtractor={item => item.id}
              onEndReachedThreshold={0.05}
              onEndReached={() => setLimit(limit + 6)}
              initialNumToRender={6}
            />
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

export default SegmentedList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container2: {
    padding: 10,
    flex: 1,
  },
  container3: {
    alignItems: 'center',
    flex: 1,
  },
  container4: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer1: {
    alignItems: 'center',
    padding: 10,
  },
  itemContainer2: {
    borderRadius: 10,
    marginBottom: 5,
    borderWidth: 1,
    padding: 5,
  },
  border: {
    borderRadius: DEVICE.width / 2,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  text1: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 20,
  },
  image1: {
    height: 50,
    width: 50,
  },
});
