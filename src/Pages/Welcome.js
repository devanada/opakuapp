/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
  TouchableNativeFeedback,
} from 'react-native';

import {CustomButton} from '../Components/CustomButton';
import {CustomButton2} from '../Components/CustomButton2';

const DEVICE = Dimensions.get('screen');

const Welcome = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor="#000" />
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            source={require('../../assets/Images/Logo2.png')}
          />
          <Text style={styles.text}>Selamat Datang</Text>
          {/* <Text style={styles.subtitle}>Silahkan pilih login sebagai</Text> */}
        </View>
        <View style={styles.container2}>
          <CustomButton2
            label="Masuk"
            onPress={() => {
              navigation.navigate('login');
            }}
          />
          <CustomButton
            label="Daftar"
            onPress={() => {
              navigation.navigate('register');
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: DEVICE.height / 10,
  },
  container2: {
    padding: 15,
  },
  image: {
    width: DEVICE.width / 2,
    height: DEVICE.width / 2,
    marginBottom: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#0f4c75',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#0f4c75',
  },
});
