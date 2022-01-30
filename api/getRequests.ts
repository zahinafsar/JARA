import {Orders, Plans} from './db';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IRequest} from '../interface/order';

const savenDays = firestore.Timestamp.fromDate(
  new Date(moment().subtract(7, 'days').format()),
);

export const getServiceRequests = async (): Promise<IRequest[]> => {
  const id = await AsyncStorage.getItem('uid');
  let orders: IRequest[] | PromiseLike<IRequest[]> = [];
  await Orders.where('userId', '==', id)
    .where('createdAt', '>=', savenDays)
    .orderBy('createdAt', 'desc')
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id};
      });
      orders = data as IRequest[];
    });
  return orders;
};

export const getPlanRequests = async (): Promise<IRequest[]> => {
  const id = await AsyncStorage.getItem('uid');
  let plans: IRequest[] | PromiseLike<IRequest[]> = [];
  await Plans.where('userId', '==', id)
    .where('status', '==', 'pending')
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id};
      });
      plans = data as IRequest[];
    });
  return plans;
};
