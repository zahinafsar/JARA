import firestore from '@react-native-firebase/firestore';

export const User = firestore().collection('users');
export const Orders = firestore().collection('orders');
export const Plans = firestore().collection('plans');
