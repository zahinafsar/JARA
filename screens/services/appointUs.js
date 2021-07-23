import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
  Input,
  Button,
  Divider,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import ContactButtons from '../../components/contactButtons';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

function AppointUs({navigation}) {
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

  const services = [
    {title: 'Computer Service'},
    {title: 'Laptop Service'},
    {title: 'Printer Service'},
    {title: 'CCTV Setup'},
    {title: 'Network Setup'},
    {title: 'Web Design'},
  ];

  const [form, setForm] = React.useState(initialValue);

  const submit = async () => {
    if (
      form.phone === '' ||
      (form.location === '' && form.lat === '') ||
      form.issue === ''
    ) {
      alert('Fillup Required Fields!')
      return;
    }
    try {
      const data = await firestore().collection('orders').add(form);
      setForm(initialValue);
      alert('You order has been placed!');
    } catch (error) {
      alert(error);
    }
  };
  const getLocation = () => {
    if (form.lat) {
      setForm({...form, lat: '', long: ''});
    } else {
      Geolocation.getCurrentPosition(position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setForm({...form, lat: currentLatitude, long: currentLongitude});
      });
    }
  };

  return (
    <ScrollView>
      <View style={{margin: 10}}>
        <Text style={styles.inputLabel}>Name</Text>
        <Input
          style={styles.input}
          placeholder="Type you name"
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
            disabled={form.location ? true : false}
            onPress={getLocation}
            style={{width: 180, marginBottom: 5, borderRadius: 30}}>
            <Text category="c1" style={{color: 'white'}}>
              {form.lat ? 'Use Custom Location' : 'Use Geographic Location'}
            </Text>
          </Button>
        </View>
        <Text style={styles.inputLabel}>Select Service</Text>
        <Select
          style={styles.input}
          placeholder={form.related_service}
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
      <Button onPress={submit} style={{marginHorizontal: 10}}>
        Submit
      </Button>
      <Divider style={{marginVertical: 20}} />
      <Text style={{textAlign: 'center'}}>Or</Text>
      <ContactButtons navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 15,
  },
  inputLabel: {
    opacity: 0.8,
    marginLeft: 1,
  },
});

export default AppointUs;
