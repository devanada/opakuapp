/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const cartRef = firestore()
  .collection('app')
  .doc('opakuapp')
  .collection('cart');

const orderRef = firestore()
  .collection('app')
  .doc('opakuapp')
  .collection('orders');

const itemRef = firestore()
  .collection('app')
  .doc('opakuapp')
  .collection('items');

export const getCartUser = async id => {
  try {
    return cartRef
      .doc(id)
      .get()
      .then(docSnapshot => {
        return {
          error: false,
          msg: 'Berhasil get cart user',
          data: docSnapshot.data(),
        };
      })
      .catch(err => {
        return {error: true, msg: err, data: []};
      });
  } catch (error) {
    return {error: true, msg: error, data: []};
  }
};

export const insertToCart = async (id, cart) => {
  try {
    return cartRef
      .doc(id)
      .get()
      .then(async doc => {
        await doc.ref.update({cart});
        return {
          error: false,
          msg: 'Berhasil dimasukkan ke keranjang',
          data: doc.data(),
        };
      })
      .catch(err => {
        return {error: true, msg: err, data: []};
      });
  } catch (error) {
    return {error: true, msg: error, data: []};
  }
};

export const createOrder = async (cart, total, coords, userID, id) => {
  return orderRef
    .add({
      listItem: cart,
      total,
      coords,
      userID,
      created_at: moment().unix(),
      updated_at: moment().unix(),
    })
    .then(async val => {
      await [null, ...cart].reduce(async (memo, item) => {
        await memo;
        await itemRef.doc(item.id).update({
          qty: firestore.FieldValue.increment(-Number(item.jumlah)),
          sold: firestore.FieldValue.increment(+Number(item.jumlah)),
        });
      });
      await cartRef.doc(id).update({cart: []});
      return {error: false, msg: 'Berhasil Checkout', data: val.id};
    })
    .catch(err => {
      return {error: true, msg: err, data: []};
    });
};

export const insertItem = async () => {
  return orderRef
    .add({
      created_at: moment().unix(),
      description:
        'Berikan si kecil Nutribaby Royal Acti Duo Bio 1 800gr Box untuk membantu mendukung perkembangan dan pertumbuhannya. Formula bayi untuk anak usia 0 hingga 6 bulan ini dibuat dengan formula Acti Duobio yang baik untuk kesehatan tubuh.',
      image:
        'https://res.cloudinary.com/hypeotesa/image/upload/v1624029847/fnb/SUSU-NUTR-075C-1_vpx8mr.jpg',
      location: 'Vietnam',
      name: 'Nutribaby Royal Acti Duo Bio 1 800gr Box',
      price: '200000',
      qty: '20',
      type: 'Food and Milk',
      updated_at: moment().unix(),
    })
    .then(async val => {
      return {error: false, msg: 'Register Berhasil', data: val.id};
    })
    .catch(err => {
      return {error: true, msg: err, data: []};
    });
};
