/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, Alert, Image, ImageBackground} from 'react-native';
import {
  Input,
  Button,
  ApplicationProvider,
  Spinner,
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context} from '../store';

function Login() {
  const [number, setNumber] = React.useState('');
  const [pin, setPin] = React.useState('');
  const [confirm, setConfirm] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [state, setState] = useContext(Context);

  async function signInWithPhoneNumber() {
    if (number.length !== 10) {
      Alert.alert('Number length must be equal 10');
      return;
    }
    setDisabled(true);
    setLoader(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber('+880' + number);
      setConfirm(confirmation);
      setDisabled(false);
      setLoader(false);
    } catch (error) {
      setDisabled(false);
      Alert.alert('Something went wrong! Try again.');
      setLoader(false);
    }
  }

  async function confirmCode() {
    setDisabled(true);
    setLoader(true);
    try {
      await confirm.confirm(pin);
      await AsyncStorage.setItem('uid', number);
      setState({...state, loggedIn: 'loggedIn'});
    } catch (error) {
      Alert.alert('Invalid Pin');
      setDisabled(false);
      setLoader(false);
    }
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <ImageBackground
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#003a1ded',
        }}>
        <View
          style={{
            height: '40%',
            width: '100%',
            position: 'absolute',
            top: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={require('../assets/logo.png')}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'white',
              marginTop: 20,
            }}>
            JARA Computers
          </Text>
        </View>
        <View
          style={{
            height: '60%',
            width: '100%',
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            elevation: 10,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '10%',
            }}>
            {loader ? (
              <View style={{bottom: 20}}>
                <Spinner status="info" size="large" />
              </View>
            ) : (
              <></>
            )}
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                marginBottom: 5,
                opacity: 0.7,
              }}>
              Sign in to continue
            </Text>
            <View>
              {!confirm ? (
                <View style={{flexDirection: 'row', margin: 10}}>
                  <Input
                    disabled={true}
                    style={{marginRight: 3}}
                    value={'+880'}
                  />
                  <Input
                    disabled={disabled}
                    style={{width: 200}}
                    placeholder="Phone Number"
                    keyboardType="numeric"
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
                    keyboardType="numeric"
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
          </View>
        </View>
      </ImageBackground>
    </ApplicationProvider>
  );
}

export default Login;
