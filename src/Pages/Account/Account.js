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

import {getAllItem} from '../../Utils/Firebase/item';
import {CustomButton2} from '../../Components/CustomButton2';
import CustomItemCard from '../../Components/CustomItemCard';

const DEVICE = Dimensions.get('screen');

const Account = props => {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(false);

  //   useEffect(() => {
  //     const getData = async () => {
  //       const datas = await getAllItem({
  //         value: true,
  //       });
  //       if (datas.error) {
  //         return Alert.alert('Get Data Error');
  //       }
  //       setData(datas.data);
  //       setDone(true);
  //     };
  //     getData();
  //   }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>AKUN</Text>
        {/* <FlatList
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
                />
              </View>
            )}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
          /> */}
        <CustomButton2
          label="Logout"
          onPress={() => {
            props.logout();
          }}
        />
      </View>
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});
