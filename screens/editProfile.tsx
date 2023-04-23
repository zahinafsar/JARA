import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Input} from '@ui-kitten/components';
import {Context} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import $alert from '../helper/alert';
import AppBar from '../components/header';
import Button from '../components/button';

const initialValue = {
  name: '',
  email: '',
  phone: '',
  location: '',
};

function EditProfile({navigation}) {
  const [form, setForm] = React.useState(initialValue);
  const [edit, setEdit] = React.useState(true);
  React.useEffect(() => {
    async function getUser() {
      const dataObj = await AsyncStorage.getItem('user');
      if (dataObj) {
        const data = JSON.parse(dataObj);
        setForm(data);
      }
    }
    getUser();
  }, []);

  async function save() {
    const user = JSON.stringify(form);
    await AsyncStorage.setItem('user', user);
    setEdit(true);
    $alert('Information Saved!');
  }
  async function clear() {
    setForm(initialValue);
    await AsyncStorage.removeItem('user');
    $alert('Information Removed!');
  }
  return (
    <>
      <View style={{flex: 1, marginTop: 10}}>
        <ScrollView style={{flex: 1}}>
          <Input
            disabled={edit}
            style={styles.input}
            placeholder="Full Name"
            size="large"
            value={form.name}
            onChangeText={value => setForm({...form, name: value})}
          />
          <Input
            disabled={edit}
            style={styles.input}
            placeholder="Email Address"
            size="large"
            value={form.email}
            onChangeText={value => setForm({...form, email: value})}
          />
          <Input
            disabled={edit}
            style={styles.input}
            placeholder="Phone Number"
            size="large"
            value={form.phone}
            onChangeText={value => setForm({...form, phone: value})}
          />
          <Input
            disabled={edit}
            style={styles.input}
            placeholder="Location"
            size="large"
            value={form.location}
            onChangeText={value => setForm({...form, location: value})}
          />
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            {!edit ? (
              <Button style={styles.saveBtn} onPress={save}>
                Save
              </Button>
            ) : (
              <Button style={styles.saveBtn} onPress={() => setEdit(false)}>
                Edit
              </Button>
            )}
            <Button style={styles.saveBtn} onPress={clear} status="warning">
              Clear
            </Button>
          </View>
        </ScrollView>
        {/* <Button style={styles.logOutBtn} onPress={} status="danger">
          Log Out
        </Button> */}
      </View>
    </>
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
    borderRadius: 0,
  },
  input: {
    margin: 5,
  },
});

export default EditProfile;
