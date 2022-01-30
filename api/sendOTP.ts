import auth from '@react-native-firebase/auth';

export const sendOTP = async (phoneNumber: string) => {
  return await auth().signInWithPhoneNumber(phoneNumber);
};
