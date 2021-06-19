/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Form} from 'native-base';

import {CustomButton2} from '../Components/CustomButton2';
import {CustomTextInput} from '../Components/CustomTextInput';
import {CustomLoading} from '../Components/CustomLoading';

const DEVICE = Dimensions.get('screen');

const Login = props => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Image
          style={styles.image}
          source={require('../../assets/Images/Logo2.png')}
        />
      </View>
      <Form style={{marginBottom: 20}}>
        <CustomTextInput
          label="Email"
          onChangeText={e => setId(e)}
          keyboardType="email-address"
          returnKeyType="next"
        />
        <CustomTextInput
          label="Kata Sandi"
          secureTextEntry={secure}
          onChangeText={e => setPassword(e)}
          onSubmitEditing={() => {
            props.login(id, password);
          }}
          returnKeyType="done"
          iconName={secure ? 'eye' : 'eye-off'}
          onPress={() => setSecure(!secure)}
        />
      </Form>
      <View>
        <CustomButton2
          label="Masuk"
          onPress={() => {
            if (id.length <= 0 || password.length <= 0) {
              Alert.alert('Textbox harus di isi');
            } else {
              props.login(id, password);
            }
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('register')}>
          <View style={styles.registerContainer}>
            <Text>
              Belum punya akun? silahkan
              <Text style={styles.registerText}> Register</Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <CustomLoading visible={props.loading} text={'Loading'} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  image: {
    width: DEVICE.width / 2,
    height: DEVICE.width / 2,
  },
  topView: {
    alignItems: 'center',
  },
  registerContainer: {
    paddingTop: 30,
    width: DEVICE.width / 1.2,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  registerText: {
    color: '#82d2ee',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
