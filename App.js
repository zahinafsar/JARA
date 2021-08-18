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
// import Call from './screens/call';

function Main() {
  const [state, setState] = useContext(Context);

  useEffect(() => {
    async function isLoggedIn() {
      // await AsyncStorage.setItem('uid', '');
      const value = await AsyncStorage.getItem('uid');
      if (value) {
        setState({...state, loggedIn: 'loggedIn', uid: value});
      } else {
        setState({...state, loggedIn: 'notLoggedIn'});
      }
      // console.log({state: state});
    }
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: 'jara',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });

    isLoggedIn();
    return unsubscribe;
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {state.loggedIn === 'loading' ? <Loading /> : <></>}
      {state.loggedIn === 'loggedIn' ? <Router /> : <></>}
      {state.loggedIn === 'notLoggedIn' ? <Login /> : <></>}
      {/* {state.loggedIn === 'callScreen' ? <Call /> : <></>} */}
    </ApplicationProvider>
  );
}

const App = () => {
  // useEffect(() => {
  // }, []);

  return (
    <Store>
      <StatusBar backgroundColor="#055603" />
      <Main />
    </Store>
  );
};

export default App;
