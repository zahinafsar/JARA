import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {IRequest} from '../interface/order';
import {Orders, Plans} from './db';

export const addServiceRequest = async (data: IRequest) => {
  const id = await AsyncStorage.getItem('uid');
  try {
    await Orders.add({
      ...data,
      userId: id,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const addPlanRequest = async (data: IRequest) => {
  const id = await AsyncStorage.getItem('uid');
  try {
    await Plans.add({
      ...data,
      userId: id,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch (error) {
    return false;
  }
};
