/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  TouchableNativeFeedback,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getDetailUser} from '../../Utils/Firebase/auth';
import {getLastTransaction} from '../../Utils/Firebase/order';
import {CustomButton2} from '../../Components/CustomButton2';
import {CustomLoading} from '../../Components/CustomLoading';
import CustomItemCard2 from '../../Components/CustomItemCard2';

const DEVICE = Dimensions.get('screen');

const Account = props => {
  const [data, setData] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let userToken = await AsyncStorage.getItem('UserLogin');
      const userData = JSON.parse(userToken);
      const datas = await getDetailUser(userData.id);
      if (datas.error) {
        return Alert.alert('Get Data Error');
      }
      setData(datas.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      let userToken = await AsyncStorage.getItem('UserLogin');
      const userData = JSON.parse(userToken);
      const datas = await getLastTransaction(userData.id);
      if (datas.error) {
        return Alert.alert('Get Data Error');
      }
      setTransaction(datas.data);
      setDone(true);
    };
    getData();
  }, []);

  if (done) {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.container3}>
            <Text style={styles.text1}>Nama: {data.fullname}</Text>
            <Text style={styles.text1}>Email: {data.email}</Text>
          </View>
          <Text style={styles.text2}>Transaksi terakhir</Text>
          <FlatList
            style={{flex: 1}}
            showsHorizontalScrollIndicator={false}
            data={transaction}
            horizontal={true}
            renderItem={({item}) => (
              <CustomItemCard2
                id={item.id}
                image={item.listItem[0].image}
                price={item.total}
              />
            )}
            keyExtractor={item => item.id}
          />
          <View style={styles.container2} />
          <CustomButton2
            label="Logout"
            onPress={() => {
              props.logout();
            }}
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

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  container2: {
    flex: 1,
  },
  container3: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text1: {
    fontSize: 14,
    color: '#000',
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
