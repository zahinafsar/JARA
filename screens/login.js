/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Input, Button, Spinner, Icon} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context} from '../store';
import firestore from '@react-native-firebase/firestore';
import {theme} from '../theme';

function Login({navigation}) {
  const [number, setNumber] = React.useState('');
  const [pin, setPin] = React.useState('');
  const [confirm, setConfirm] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [state, setState] = useContext(Context);
  const pulseIconRef = React.useRef();

  React.useEffect(() => {
    pulseIconRef.current.startAnimation();
  }, []);

  async function signInWithPhoneNumber() {
    if (number.length !== 11) {
      Alert.alert('The length of the number must be equal to 11');
      return;
    }
    setDisabled(true);
    setLoader(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber('+88' + number);
      setConfirm(confirmation);
      setDisabled(false);
      setLoader(false);
    } catch (error) {
      // console.log(error);
      setDisabled(false);
      Alert.alert('Something went wrong! Try again.');
      setLoader(false);
    }
  }
  function backToHome() {
    navigation.navigate('Home');
  }
  async function confirmCode() {
    const token = await AsyncStorage.getItem('token');
    // console.log(state.token);
    setDisabled(true);
    setLoader(true);
    try {
      await confirm.confirm(pin);
      await firestore().collection('users').doc(number).set({
        name: '',
        token: token,
      });
      await AsyncStorage.setItem('uid', number);
      setState({...state, uid: number});
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Alert.alert('Invalid Pin');
      setDisabled(false);
      setLoader(false);
    }
  }

  const Back = props => (
    <Icon
      ref={pulseIconRef}
      animationConfig={{cycles: Infinity}}
      animation="pulse"
      {...props}
      name="arrow-back-outline"
    />
  );

  return (
    <ImageBackground
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.color_primary,
      }}>
      <Button
        style={styles.button}
        appearance="ghost"
        status="control"
        size="giant"
        accessoryLeft={Back}
        onPress={backToHome}
      />
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
                <Input disabled={true} style={{marginRight: 3}} value={'+88'} />
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
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 0,
  },
});

export default Login;
