import React, {useContext, useEffect} from 'react';
import Router from './router';
import Login from './screens/login';
import Loading from './screens/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store, {Context} from './store';
import {StatusBar} from 'react-native';
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

  if (state.loggedIn === 'loading') {
    return <Loading />;
  } else if (state.loggedIn === 'loggedIn') {
    return <Router />;
  } else {
    return <Login />;
  }
}

function App() {
  return (
    <Store>
      <StatusBar backgroundColor="#003a1ded" />
      <Main />
    </Store>
  );
}

export default App;
