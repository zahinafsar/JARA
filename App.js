import React, {useContext, useEffect} from 'react';
import Router from './router';
// import Login from './screens/login';
// import Loading from './screens/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store, {Context} from './store';
import {StatusBar} from 'react-native';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
// import Call from './screens/call';

function Main() {
  const [state, setState] = useContext(Context);

  useEffect(() => {
    async function setId() {
      const value = await AsyncStorage.getItem('uid');
      if (value) {
        setState({...state, uid: value});
      }
    }
    setId();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Router />
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
