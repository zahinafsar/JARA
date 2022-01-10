import {ToastAndroid} from 'react-native';

const $alert = (alert: string) => {
  ToastAndroid.show(alert, 50);
};

export default $alert;
