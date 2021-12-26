import React from 'react';
import {View, Image, StyleSheet, ScrollView, Linking} from 'react-native';
import {Button} from '@ui-kitten/components';

const hardware = [
  'Contacts assembling',
  'Repair hardware components',
  'Find & Fix unknown issues',
  'PC cleaning',
  'Upgrade components',
];
function Contacts({navigation}) {
  return (
    <>
      <View style={{margin: 5}}>
        <Button
          style={{marginBottom: 10}}
          status="warning"
          onPress={() => Linking.openURL('tel: 01819459974')}>
          +8801819459974
        </Button>
        <Button
          style={{marginBottom: 10}}
          status="warning"
          onPress={() => Linking.openURL('tel: 01717459483')}>
          +8801717459483
        </Button>
        <Button
          style={{marginBottom: 10}}
          status="warning"
          onPress={() => Linking.openURL('tel: 01557848523')}>
          +8801557848523
        </Button>
        <Button
          style={{marginBottom: 10}}
          status="warning"
          onPress={() => Linking.openURL('tel: 01979459974')}>
          +8801979459974
        </Button>
        <Button
          style={{marginBottom: 10}}
          status="warning"
          onPress={() => Linking.openURL('tel: 01744273747')}>
          +8801744273747
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});

export default Contacts;
