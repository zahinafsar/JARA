import React from 'react';
import {View, Image, StyleSheet, ScrollView, Linking, Text} from 'react-native';
import {Button, Input, Divider} from '@ui-kitten/components';
import {Context} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialValue = {
  name: '',
  email: '',
  phone: '',
  location: '',
};

function Profile({navigation}) {
  const [state, setState] = React.useContext(Context);
  const [form, setForm] = React.useState(initialValue);
  React.useEffect(() => {
    // if (!state.uid) {
    //   setState({...state, loggedIn: 'notLoggedIn'});
    //   return;
    // }
    async function getUser() {
      const dataObj = await AsyncStorage.getItem('user');
      if (dataObj) {
        const data = JSON.parse(dataObj);
        setForm(data);
      }
    }
    getUser();
  }, []);
  async function logout() {
    // const dataObj = await AsyncStorage.getItem('user');
    // const data = JSON.parse(dataObj);
    // console.log(data.name);
    setState({...state, uid: ''});
    navigation.navigate('Home');
  }
  async function save() {
    const user = JSON.stringify(form);
    await AsyncStorage.setItem('user', user);
    alert('Information Saved!');
  }
  async function clear() {
    setForm(initialValue);
    await AsyncStorage.removeItem('user');
    alert('Information Removed!');
  }
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <Input
          style={styles.input}
          placeholder="Full Name"
          size="large"
          value={form.name}
          onChangeText={value => setForm({...form, name: value})}
        />
        <Input
          style={styles.input}
          placeholder="Email Address"
          size="large"
          value={form.email}
          onChangeText={value => setForm({...form, email: value})}
        />
        <Input
          style={styles.input}
          placeholder="Phone Number"
          size="large"
          value={form.phone}
          onChangeText={value => setForm({...form, phone: value})}
        />
        <Input
          style={styles.input}
          placeholder="Location"
          size="large"
          value={form.location}
          onChangeText={value => setForm({...form, location: value})}
        />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Button style={styles.saveBtn} onPress={save}>
            Save
          </Button>
          <Button style={styles.saveBtn} onPress={clear} status="warning">
            Clear
          </Button>
        </View>
      </ScrollView>
      <Button style={styles.logOutBtn} onPress={logout} status="warning">
        Log Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  saveBtn: {
    margin: 10,
    flex: 1,
  },
  logOutBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  input: {
    margin: 5,
  },
});

export default Profile;
