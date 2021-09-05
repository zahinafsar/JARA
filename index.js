import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

PushNotification.configure({
  onRegister: async function (res) {
    await AsyncStorage.setItem('token', res.token);
    // console.log(res.token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },

  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // permissions: {
  //   alert: true,
  //   badge: true,
  //   sound: true,
  // },

  popInitialNotification: true,

  requestPermissions: true,
});

PushNotification.createChannel({
  channelId: 'jara',
  channelName: 'jara',
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  PushNotification.localNotification({
    channelId: 'jara',
    channelName: 'jara',
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
    timeoutAfter: 30000,
  });
});

AppRegistry.registerComponent(appName, () => App);
