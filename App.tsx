import React, {useContext, useEffect} from 'react';
import Router from './router';
// import Login from './screens/login';
// import Loading from './screens/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store, {Context} from './store';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
// import Call from './screens/call';
import {StatusBar, StyleSheet} from 'react-native';
import {myTheme, theme} from './theme';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

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
    <ApplicationProvider {...eva} theme={{...eva.light, ...myTheme}}>
      <IconRegistry icons={EvaIconsPack} />
      <Router />
    </ApplicationProvider>
  );
}

const App = () => {
  return (
    <Store>
      <StatusBar backgroundColor={theme.primary_1} />
      <Main />
    </Store>
  );
};

export default App;
