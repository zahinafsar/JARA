/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Alert} from 'react-native';
import {Input, Button, ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
  const [number, setNumber] = React.useState('');
  const [pin, setPin] = React.useState('');
  const [confirm, setConfirm] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);
  const [message, setMessage] = React.useState('');

  async function signInWithPhoneNumber() {
    if (number.length !== 10) {
      Alert.alert('Number length must be equal 10');
      return;
    }
    setDisabled(true);
    setMessage('Loading...');
    try {
      const confirmation = await auth().signInWithPhoneNumber('+880' + number);
      setConfirm(confirmation);
      setDisabled(false);
      setMessage('');
    } catch (error) {
      setDisabled(false);
      Alert.alert('Something went wrong! Try again.');
      setMessage('');
    }
  }

  async function confirmCode() {
    setDisabled(true);
    try {
      await confirm.confirm(pin);
      await AsyncStorage.setItem('uid', number);
    } catch (error) {
      Alert.alert('Invalid Pin');
      setDisabled(false);
    }
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 30}}>Login</Text>
        <View>
          {!confirm ? (
            <View style={{flexDirection: 'row', margin: 10}}>
              <Input disabled={true} style={{marginRight: 3}} value={'+880'} />
              <Input
                disabled={disabled}
                style={{width: 200}}
                placeholder="Phone Number"
                value={number}
                onChangeText={v => (!isNaN(v) ? setNumber(v) : '')}
              />
            </View>
          ) : (
            <View style={{flexDirection: 'row', margin: 10}}>
              <Input
                disabled={disabled}
                style={{width: 200, margin: 2}}
                placeholder="Pin"
                value={pin}
                onChangeText={v => setPin(v)}
              />
              <Button
                style={{marginLeft: 5}}
                disabled={disabled || !pin}
                onPress={() => confirmCode()}>
                Verify
              </Button>
            </View>
          )}
        </View>
        {!confirm ? (
          <Button
            disabled={disabled || !number}
            onPress={() => signInWithPhoneNumber()}>
            Send OTP
          </Button>
        ) : (
          <Button style={{marginLeft: 5}} onPress={() => setConfirm(false)}>
            Change Number
          </Button>
        )}
        <Text>{message}</Text>
      </View>
    </ApplicationProvider>
  );
}

export default Login;
