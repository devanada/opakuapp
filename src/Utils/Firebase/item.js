/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';

const laundryRef = firestore()
  .collection('app')
  .doc('opakuapp')
  .collection('items');

export const getAllItem = async () => {
  try {
    let data = [];
    return laundryRef
      .get()
      .then(docSnapshot => {
        docSnapshot.forEach(doc => {
          data.push({id: doc.id, ...doc.data()});
        });

        if (docSnapshot.size === data.length) {
          return {error: false, msg: 'Berhasil get all item', data};
        }
      })
      .catch(err => {
        return {error: true, msg: err, data: []};
      });
  } catch (error) {
    return {error: true, msg: error, data: []};
  }
};

export const getItemByType = async ({type}) => {
  try {
    let data = [];
    return laundryRef
      .where('type', '==', type)
      .get()
      .then(docSnapshot => {
        docSnapshot.forEach(doc => {
          data.push({id: doc.id, ...doc.data()});
        });

        if (docSnapshot.size === data.length) {
          return {error: false, msg: 'Berhasil get all item', data};
        }
      })
      .catch(err => {
        return {error: true, msg: err, data: []};
      });
  } catch (error) {
    return {error: true, msg: error, data: []};
  }
};

export const bestSellerItem = async ({limit}) => {
  try {
    let data = [];
    return laundryRef
      .orderBy('sold', 'desc')
      .limit(limit)
      .get()
      .then(docSnapshot => {
        docSnapshot.forEach(doc => {
          data.push({id: doc.id, ...doc.data()});
        });

        if (docSnapshot.size === data.length) {
          return {error: false, msg: 'Berhasil get all item', data};
        }
      })
      .catch(err => {
        return {error: true, msg: err, data: []};
      });
  } catch (error) {
    return {error: true, msg: error, data: []};
  }
};

export const searchItem = async ({text}) => {
  try {
    let data = [];
    return laundryRef
      .orderBy('name')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(docSnapshot => {
        docSnapshot.forEach(doc => {
          data.push({id: doc.id, ...doc.data()});
        });

        if (docSnapshot.size === data.length) {
          return {error: false, msg: 'Berhasil get all item', data};
        }
      })
      .catch(err => {
        return {error: true, msg: err, data: []};
      });
  } catch (error) {
    return {error: true, msg: error, data: []};
  }
};
