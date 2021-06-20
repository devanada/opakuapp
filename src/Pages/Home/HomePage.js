/* eslint-disable prettier/prettier */ /* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
  Image,
  LogBox,
} from 'react-native';
import {Header, Item, Input, Icon, Badge} from 'native-base';
import analytics from '@react-native-firebase/analytics';

import {getAllItem, bestSellerItem} from '../../Utils/Firebase/item';
import {getCartUser, insertItem} from '../../Utils/Firebase/order';
import CustomItemCard from '../../Components/CustomItemCard';
import {CustomLoading} from '../../Components/CustomLoading';

const DEVICE = Dimensions.get('screen');

const HomePage = props => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [cart, setCart] = useState({});
  const [done, setDone] = useState(false);
  const [limit, setLimit] = useState(6);
  const menu = [
    {
      id: 1,
      title: 'Bodysuit',
      image: require('../../../assets/Images/bodysuit.png'),
    },
    {
      id: 2,
      title: 'Stroller',
      image: require('../../../assets/Images/stroller.png'),
    },
    {
      id: 3,
      title: 'Food and Milk',
      image: require('../../../assets/Images/milk.png'),
    },
  ];

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      LogBox.ignoreLogs([
        'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
      ]);
      getCartUser(props.data.cartID).then(val => {
        if (val.error) {
          Alert.alert('Error get history chat', val.msg);
        }
        setCart(val.data);
      });
    });
    return unsubscribe;
  }, [props]);

  useEffect(() => {
    const getData = async () => {
      const datas = await getAllItem();
      if (datas.error) {
        return Alert.alert('Get Data Error');
      }
      let array = datas.data;
      let i = array.length - 1;
      for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      setData2(array);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const datas = await bestSellerItem({limit});
      if (datas.error) {
        return Alert.alert('Get Data Error');
      }
      let newData = [...datas.data];
      setData(newData);
      setDone(true);
    };
    getData();
  }, [limit]);

  const testPost = async () => {
    const reg = await insertItem();
    if (reg.error) {
      Alert.alert('error', reg.msg);
    } else {
      Alert.alert(
        'Success',
        'Berhasil register, silahkan login dengan email yang didaftarkan',
      );
    }
  };

  const handleClick = async item => {
    await analytics().logSelectContent({
      content_type: item.type,
      item_id: item.id,
    });
    await props.navigation.navigate('DetailItem', {
      data: item,
      user: props.data,
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
            androidStatusBarColor={'#000'}>
            <Item
              style={[styles.border, {borderColor: '#0f4c75'}]}
              onPress={() =>
                props.navigation.navigate('Search', {user: props.data})
              }>
              <Icon name="ios-search" />
              <Input placeholder="Search" disabled />
            </Item>
            <Item
              style={{flex: 0}}
              onPress={() =>
                props.navigation.navigate('Cart', {
                  user: props.data,
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
          <ScrollView
            style={styles.container2}
            contentContainerStyle={{flex: 1}}>
            <View style={styles.container3}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                horizontal={false}
                numColumns={2}
                ListHeaderComponent={() => (
                  <View>
                    <View style={styles.container4}>
                      {menu.map((item, index) => (
                        <TouchableNativeFeedback
                          key={item.id}
                          onPress={() =>
                            props.navigation.navigate('SegmentedList', {
                              type: item.title,
                            })
                          }>
                          <View style={styles.itemContainer1}>
                            <View style={styles.itemContainer2}>
                              <Image
                                style={styles.image1}
                                resizeMode="contain"
                                source={item.image}
                              />
                            </View>
                            <Text style={styles.textStyle3}>{item.title}</Text>
                          </View>
                        </TouchableNativeFeedback>
                      ))}
                    </View>
                    <Text style={styles.text1}>Recommended</Text>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      data={data2}
                      horizontal={true}
                      renderItem={({item}) => (
                        <View>
                          <CustomItemCard
                            id={item.id}
                            image={item.image}
                            handleClick={() => {
                              handleClick(item);
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
                    />
                    <Text style={styles.text1}>Best Seller</Text>
                  </View>
                )}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                }}
                renderItem={({item}) => (
                  <View>
                    <CustomItemCard
                      id={item.id}
                      image={item.image}
                      handleClick={() => {
                        handleClick(item);
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
          </ScrollView>
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

export default HomePage;

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
