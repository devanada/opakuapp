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
import {Header, Item, Input, Icon, Badge} from 'native-base';

import {searchItem} from '../../Utils/Firebase/item';
import {getCartUser} from '../../Utils/Firebase/order';
import CustomItemCard from '../../Components/CustomItemCard';

const DEVICE = Dimensions.get('screen');

const Search = props => {
  const {user} = props.route.params;
  const [data, setData] = useState([]);
  const [cart, setCart] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    getCartUser(user.cartID).then(val => {
      if (val.error) {
        Alert.alert('Error get history chat', val.msg);
      }
      setCart(val.data);
      setDone(true);
    });
  }, [user.cartID]);

  const searchText = async e => {
    await searchItem({text: e}).then(val => {
      if (e.length <= 0) {
        setData([]);
      } else {
        setData(val.data);
      }
    });
  };

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
            <Item style={[styles.border, {borderColor: '#0f4c75'}]}>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onChangeText={searchText.bind(this)}
              />
            </Item>
            <Item
              style={{flex: 0}}
              onPress={() =>
                props.navigation.navigate('Cart', {
                  user: user,
                })
              }>
              <Icon name="cart" style={{color: 'black'}} />
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
          <View style={styles.container2}>
            <FlatList
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
              onEndReachedThreshold={0.5}
              initialNumToRender={5}
            />
          </View>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
      </>
    );
  }
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
    alignItems: 'center',
    flex: 1,
  },
  border: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: DEVICE.width / 2,
  },
});
