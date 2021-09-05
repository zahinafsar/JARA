import React, {useEffect} from 'react';
import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import {
  Text,
  Input,
  Button,
  Spinner,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import ContactButtons from '../../components/contactButtons';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialValue = {
  name: '',
  email: '',
  phone: '',
  location: '',
  related_service: '',
  issue: '',
  message: '',
  lat: '',
  long: '',
};

const Confirm = ({navigation}) => {
  const [form, setForm] = React.useState(initialValue);
  const [savedLocation, setLocation] = React.useState();
  const [loader, setLoader] = React.useState(false);
  React.useEffect(() => {
    async function getUser() {
      const dataObj = await AsyncStorage.getItem('user');
      if (dataObj) {
        const {name, email, phone, location} = JSON.parse(dataObj);
        setLocation(location);
        setForm({...form, name, email, phone, location});
        // console.log(name);
        // initialValue.name = name;
        // initialValue.email = email;
        // initialValue.phone = phone;
        // initialValue.location = location;
      }
    }
    getUser();
  }, []);
  // console.log('rerenders..');

  const services = [
    {title: 'Computer Service'},
    {title: 'Laptop Service'},
    {title: 'Printer Service'},
    {title: 'CCTV Setup'},
    {title: 'Network Setup'},
    {title: 'Web Design'},
  ];

  const submit = async () => {
    if (loader) {
      return;
    }
    setLoader(true);
    if (
      form.phone === '' ||
      (form.location === '' && form.lat === '') ||
      form.issue === ''
    ) {
      alert('Fillup Required Fields!');
      setLoader(false);
      return;
    }
    try {
      const data = await firestore().collection('orders').add(form);
      setForm(initialValue);
      alert('You order has been placed!');
      setLoader(false);
    } catch (error) {
      alert(error);
      setLoader(false);
    }
  };
  // async function requestLocationPermission() {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     {
  //       title: 'Location Permission',
  //       message: 'JARA needs access to your location',
  //     },
  //   );

  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  function getLocation() {
    if (form.lat) {
      setForm({...form, location: savedLocation, lat: '', long: ''});
    } else {
      Geolocation.getCurrentPosition(position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setForm({...form, lat: currentLatitude, long: currentLongitude});
      });
    }
  }

  return (
    <ScrollView>
      <View style={{margin: 10}}>
        <ContactButtons navigation={navigation} />
        <Text style={{textAlign: 'center'}}>Or</Text>
        <Text style={styles.inputLabel}>Name</Text>
        <Input
          style={styles.input}
          placeholder="Type your name"
          size="medium"
          value={form.name}
          onChangeText={value => setForm({...form, name: value})}
        />
        <Text style={styles.inputLabel}>
          Phone Number<Text style={{color: 'red'}}> (required)</Text>
        </Text>
        <Input
          style={styles.input}
          size="medium"
          placeholder="017********"
          value={form.phone}
          onChangeText={value => setForm({...form, phone: value})}
        />
        <Text style={styles.inputLabel}>Email Address</Text>
        <Input
          style={styles.input}
          size="medium"
          placeholder="example@abc.xyz"
          value={form.email}
          onChangeText={value => setForm({...form, email: value})}
        />
        <Text style={styles.inputLabel}>
          Location<Text style={{color: 'red'}}> (required)</Text>
        </Text>
        <View style={{alignItems: 'center'}}>
          <Input
            style={styles.input}
            size="medium"
            disabled={form.lat ? true : false}
            placeholder="Your device location"
            value={form.lat ? `${form.lat}, ${form.long}` : form.location}
            onChangeText={value => setForm({...form, location: value})}
          />
          <Button
            onPress={() => getLocation()}
            style={{width: 200, marginBottom: 5, borderRadius: 30}}>
            <Text category="c1" style={{color: 'white'}}>
              {form.lat ? 'Use Custom Location' : 'Use Geographic Location'}
            </Text>
          </Button>
        </View>
        <Text style={styles.inputLabel}>Select Service</Text>
        <Select
          style={styles.input}
          value={form.related_service}
          onSelect={index =>
            setForm({...form, related_service: services[index - 1].title})
          }>
          {services.map(a => (
            <SelectItem key={a} title={a.title} />
          ))}
        </Select>
        <Text style={styles.inputLabel}>
          Issues<Text style={{color: 'red'}}> (required)</Text>
        </Text>
        <Input
          style={styles.input}
          multiline={true}
          textStyle={{minHeight: 70}}
          placeholder="Type your devices problems"
          value={form.issue}
          onChangeText={value => setForm({...form, issue: value})}
        />
        <Text style={styles.inputLabel}>Message</Text>
        <Input
          style={styles.input}
          multiline={true}
          textStyle={{minHeight: 70}}
          placeholder="Type you message..."
          value={form.message}
          onChangeText={value => setForm({...form, message: value})}
        />
      </View>
      <Button onPress={submit} style={{marginHorizontal: 10, marginBottom: 30}}>
        {!loader ? 'Submit' : <Spinner status="control" />}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 15,
  },
  inputLabel: {
    opacity: 0.8,
    marginLeft: 1,
  },
});

export default Confirm;
