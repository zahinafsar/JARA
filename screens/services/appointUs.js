import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
import ContactButtons from '../../components/contactButtons';
function AppointUs({navigation}) {
  return (
    <View>
      <ContactButtons navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default AppointUs;
