import React from 'react';
import {View, Image, StyleSheet, ScrollView, Linking} from 'react-native';
import {Button, ButtonProps, Icon, Text} from '@ui-kitten/components';

const hardware = [
  'Contacts assembling',
  'Repair hardware components',
  'Find & Fix unknown issues',
  'PC cleaning',
  'Upgrade components',
];

const Person = (props: any) => <Icon {...props} name="person-outline" />;

const Call = (props: any) => <Icon {...props} name="phone-call-outline" />;

const ContactButton = ({number}: any) => (
  <Button
    accessoryLeft={props => (
      <View style={{flexDirection: 'row'}}>
        <Person {...props} />
        <Text style={{opacity: 0.5}}>+88{number}</Text>
      </View>
    )}
    accessoryRight={Call}
    appearance="outline"
    style={{marginBottom: 10, justifyContent: 'space-between'}}
    status="primary"
    onPress={() => Linking.openURL(`tel: ${number}`)}
  />
);
function Contacts({navigation}) {
  return (
    <>
      <View style={{margin: 5}}>
        <ContactButton number="01819459974" />
        <ContactButton number="01717459483" />
        <ContactButton number="01557848523" />
        <ContactButton number="01979459974" />
        <ContactButton number="01744273747" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});

export default Contacts;
