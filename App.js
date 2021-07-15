import * as React from 'react';
import Router from './router';
import Login from './screens/login';
import Loading from './screens/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [state, setState] = React.useState('');
  async function isLoggrfIn() {
    const value = await AsyncStorage.getItem('uid');
    // console.log(value);
    if (value) {
      setState('loggedIn');
    }
  }
  isLoggrfIn();

  if (!state) {
    return <Loading />;
  } else if (state === 'loggedIn') {
    return <Router />;
  } else {
    return <Login />;
  }
}

export default App;
