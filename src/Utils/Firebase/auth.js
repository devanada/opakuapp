/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const authRef = firestore()
  .collection('app')
  .doc('opakuapp')
  .collection('users');

const cartRef = firestore()
  .collection('app')
  .doc('opakuapp')
  .collection('cart');

export const register = async (email, password, WA, fullname) => {
  return authRef
    .add({
      email,
      password,
      phone_number: WA,
      fullname,
      created_at: moment().unix(),
      updated_at: moment().unix(),
    })
    .then(async val => {
      await cartRef
        .add({
          userId: val.id,
          cart: [],
          createdAt: moment().unix(),
          updated_at: moment().unix(),
        })
        .then(async docRef => {
          await authRef.doc(val.id).update({cartID: docRef.id});
        });
      return {error: false, msg: 'Register Berhasil', data: val.id};
    })
    .catch(err => {
      return {error: true, msg: err, data: []};
    });
};

export const login = async (email, password) => {
  return authRef
    .where('email', '==', email)
    .get()
    .then(val => {
      let _error;
      let _msg;
      let _data;
      if (val.docs.length !== 0) {
        val.forEach(documentSnapshot => {
          const userData = documentSnapshot.data();
          if (userData.password === password) {
            _error = false;
            _msg = 'Berhasil Login';
            _data = {id: documentSnapshot.id, ...userData};
          } else {
            _error = true;
            _msg = 'Password salah';
            _data = [];
          }
        });
      } else {
        _error = true;
        _msg = 'Email tidak ditemukan';
        _data = [];
      }
      return {error: _error, msg: _msg, data: _data};
    })
    .catch(err => {
      return {error: true, msg: err, data: []};
    });
};
