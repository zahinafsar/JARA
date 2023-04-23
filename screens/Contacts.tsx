import React from 'react';
import {View, Linking, TouchableOpacity} from 'react-native';
import {Button, Icon, Text} from '@ui-kitten/components';
import {theme} from '../theme';

const Person = (props: any) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: 'black',
      // borderRadius: 50,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20,
    }}>
    <Icon {...props} fill="black" name="person-outline" />
  </View>
);

const Call = (props: any) => (
  <Icon
    width={30}
    height={30}
    fill={theme.primary_1}
    {...props}
    name="phone-call-outline"
  />
);

const ContactButton = ({number}: any) => (
  <Button
    accessoryLeft={props => (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Person onPress={{}} {...props} />
        <Text>+88{number}</Text>
      </View>
    )}
    accessoryRight={props => (
      <TouchableOpacity onPress={() => Linking.openURL(`tel: ${number}`)}>
        <Call {...props} />
      </TouchableOpacity>
    )}
    appearance="outline"
    style={{
      marginVertical: 5,
      justifyContent: 'space-between',
      backgroundColor: 'white',
      elevation: 3,
    }}
    status="control"
  />
);
function Contacts({navigation}) {
  return (
    <>
      <View style={{padding: 5, backgroundColor: 'white', flex: 1}}>
        <ContactButton number="01819459974" />
        <ContactButton number="01717459483" />
        <ContactButton number="01557848523" />
        <ContactButton number="01979459974" />
        <ContactButton number="01744273747" />
      </View>
    </>
  );
}


export default Contacts;
