import React, {useContext, useEffect} from 'react';
import Router from './router';
import Login from './screens/login';
import Loading from './screens/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store, {Context} from './store';
import {StatusBar} from 'react-native';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

function Main() {
  const [state, setState] = useContext(Context);
  useEffect(() => {
    async function isLoggedIn() {
      const value = await AsyncStorage.getItem('uid');
      if (value) {
        setState({...state, loggedIn: 'loggedIn', uid: value});
      } else {
        setState({...state, loggedIn: 'notLoggedIn'});
      }
    }
    isLoggedIn();
  }, [setState, state]);
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {state.loggedIn === 'loading' ? <Loading /> : <></>}
      {state.loggedIn === 'loggedIn' ? <Router /> : <></>}
      {state.loggedIn === 'notLoggedIn' ? <Login /> : <></>}
    </ApplicationProvider>
  );
}

function App() {
  return (
    <Store>
      <StatusBar backgroundColor="#055603" />
      <Main />
    </Store>
  );
}

export default App;
