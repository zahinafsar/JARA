import React, {useContext, useEffect} from 'react';
import Router from './router';
import Login from './screens/login';
import Loading from './screens/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store, {Context} from './store';
import {StatusBar} from 'react-native';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

let token;

PushNotification.configure({
  onRegister: function (res) {
    // console.log('TOKEN:', res);
    token = res.token;
  },
  onNotification: function (notification) {
    // console.log('NOTIFICATION:', notification);
  },

  onAction: function (notification) {
    // console.log('ACTION:', notification.action);
    // console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err) {
    // console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
});

PushNotification.createChannel({
  channelId: 'jara',
  channelName: 'jara',
});

function Main() {
  const [state, setState] = useContext(Context);

  useEffect(() => {
    async function isLoggedIn() {
      // await AsyncStorage.setItem('uid', '');
      const value = await AsyncStorage.getItem('uid');
      if (value) {
        setState({...state, loggedIn: 'loggedIn', uid: value, token: token});
      } else {
        setState({...state, loggedIn: 'notLoggedIn', token: token});
      }
      // console.log({state: state});
    }
    isLoggedIn();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {state.loggedIn === 'loading' ? <Loading /> : <></>}
      {state.loggedIn === 'loggedIn' ? <Router /> : <></>}
      {state.loggedIn === 'notLoggedIn' ? <Login /> : <></>}
    </ApplicationProvider>
  );
}

const App = () => {
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      PushNotification.localNotification({
        channelId: 'jara',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });
  }, []);

  return (
    <Store>
      <StatusBar backgroundColor="#055603" />
      <Main />
    </Store>
  );
};

export default App;
