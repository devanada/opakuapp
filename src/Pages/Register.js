/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Alert} from 'react-native';
import {Form} from 'native-base';

import {register} from '../Utils/Firebase/auth';
import {CustomButton2} from '../Components/CustomButton2';
import {CustomTextInput} from '../Components/CustomTextInput';
import {CustomLoading} from '../Components/CustomLoading';

const DEVICE = Dimensions.get('screen');

const Register = props => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [WA, setWA] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);

  const handleSubmit = async () => {
    setIsLoading(true);
    const reg = await register(email, password, WA, fullname);
    if (reg.error) {
      Alert.alert('error', reg.msg);
    } else {
      Alert.alert(
        'Success',
        'Berhasil register, silahkan login dengan email yang didaftarkan',
      );
      props.navigation.goBack();
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Form style={styles.container2}>
        <CustomTextInput
          label="Nama Lengkap"
          onChangeText={e => setFullname(e)}
        />
        <CustomTextInput
          label="Email"
          onChangeText={e => setEmail(e)}
          keyboardType="email-address"
        />
        <CustomTextInput
          label="Nomor HP"
          onChangeText={e => setWA(e)}
          keyboardType="numeric"
        />
        <CustomTextInput
          label="Kata Sandi"
          secureTextEntry={secure}
          onChangeText={e => setPassword(e)}
          iconName={secure ? 'eye' : 'eye-off'}
          onPress={() => setSecure(!secure)}
        />
        <CustomTextInput
          label="Ulangi Kata Sandi"
          secureTextEntry={secure2}
          onChangeText={e => setRePassword(e)}
          iconName={secure2 ? 'eye' : 'eye-off'}
          onPress={() => setSecure2(!secure2)}
        />
      </Form>
      <CustomButton2
        label="Register"
        onPress={() => {
          if (
            email.length <= 0 ||
            password.length <= 0 ||
            WA.length <= 0 ||
            fullname.length <= 0
          ) {
            Alert.alert('Textinput harus diisi');
          } else if (rePassword !== password) {
            Alert.alert('Password tidak sama');
          } else {
            handleSubmit();
          }
        }}
      />
      <CustomLoading visible={isLoading} text={'Loading'} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  container2: {
    marginBottom: 20,
  },
});
