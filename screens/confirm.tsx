/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Input, Button, Spinner} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {service} from '../repository';
import $alert from '../helper/alert';
import {addPlanRequest, addServiceRequest} from '../api/addRequest';
import {getPlanRequests} from '../api/getRequests';
import Icon from '../components/icon';
import {theme} from '../theme';

const Confirm = ({route, navigation}: any) => {
  const name = route.params?.name;
  const plan = route.params?.plan;
  const initialValue = {
    location: '',
    related_service: name || '',
    issue: '',
    message: '',
    lat: '',
    long: '',
    status: 'pending',
  };
  const [form, setForm] = React.useState(initialValue);
  const [savedLocation, setLocation] = React.useState();
  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    async function getUser() {
      const dataObj = await AsyncStorage.getItem('user');
      if (dataObj) {
        const {location} = JSON.parse(dataObj);
        setLocation(location);
      }
    }
    getUser();
  }, []);

  const submit = async () => {
    if (loader) {
      return;
    }
    const id = await AsyncStorage.getItem('uid');
    if (!id) {
      $alert('Please try to login again!');
      return;
    }
    if (!plan && !form.issue) {
      $alert('Add your issue!');
      setLoader(false);
      return;
    }
    if (!(form.lat || form.long || form.location)) {
      $alert('Add your location!');
      setLoader(false);
      return;
    }

    try {
      setLoader(true);
      if (plan) {
        const plans = await getPlanRequests();
        if (plans[0].status === 'pending') {
          $alert('You already have a pending request!');
          setLoader(false);
          return;
        }
      }
      if (plan) {
        await addPlanRequest(form as any);
      } else {
        await addServiceRequest(form as any);
      }
      setLoader(false);
      setForm(initialValue);
      $alert('You order has been placed!');
      navigation.navigate('Home');
    } catch (error) {
      setLoader(false);
      $alert(error);
    }
  };

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>
            <Text style={styles.inputLabel}>Location</Text>
            <Text style={{fontSize: 12}}>
              {' '}
              (click the icon to add geo location)
            </Text>
          </Text>
          <TouchableOpacity onPress={() => getLocation()}>
            <Icon size={25} name="pin" fill={theme.primary_1} />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Input
            style={styles.input}
            size="medium"
            disabled={form.lat ? true : false}
            placeholder="Your device location"
            value={form.lat ? `${form.lat}, ${form.long}` : form.location}
            onChangeText={value => setForm({...form, location: value})}
          />
        </View>
        {!plan ? (
          <>
            <Text style={styles.inputLabel}>Issues</Text>
            <Input
              style={styles.input}
              multiline={true}
              numberOfLines={10}
              placeholder="Type your devices problems"
              value={form.issue}
              onChangeText={value => setForm({...form, issue: value})}
            />
          </>
        ) : (
          <>
            <Text style={styles.inputLabel}>Message</Text>
            <Input
              style={styles.input}
              multiline={true}
              numberOfLines={10}
              placeholder="Type you message..."
              value={form.message}
              onChangeText={value => setForm({...form, message: value})}
            />
          </>
        )}
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
    marginLeft: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Confirm;
