/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {theme} from '../theme';
import {Button, Icon, Card, Divider, Text} from '@ui-kitten/components';
import ContactButtons from '../components/contactButtons';

const StarIcon = props => <Icon {...props} name="star" />;
const Arrow = props => <Icon {...props} name="arrow-forward-outline" />;

function Membership({navigation}) {
  const RenderItem = ({data}) => {
    return (
      <View>
        <View style={{flexDirection: 'row', maxWidth: '90%'}}>
          <Icon
            style={{height: 20, width: 20, marginRight: 15}}
            fill="#8F9BB3"
            name="arrow-right-outline"
          />
          <Text>{data}</Text>
        </View>
        <Divider style={{marginVertical: 13}} />
      </View>
    );
  };

  const whyToCall = [
    'অটোরিক্সা বা CNG এর জন্য ঘন্টার পর ঘণ্টা রাস্তায় দাড়িয়ে থাকতে হবে না',
    'কম্পিউটার নিয়ে রাস্তায় বের হওয়ার ভোগান্তিও পোহাতে হবে না',
    'Service সেন্টারে নিতে হবে না',
    'সময় অপচয় হবে না',
    'গাড়ী ভাড়া সাশ্রয় হবে',
    'আপনার ঘরে বসেই Computer সমস্যা সমাধান',
  ];
  return (
    <>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 250, height: 250, resizeMode: 'contain'}}
            source={require('../assets/why.png')}
          />
        </View>
        <Button
          onPress={() => {
            navigation.navigate('termsMember');
          }}
          accessoryRight={Arrow}
          status="warning"
          style={{margin: 13, elevation: 5}}>
          ১ বছরের Home Service মাত্র ১০০০/= টাকা
        </Button>
        <Button
          style={styles.button}
          status="info"
          accessoryLeft={StarIcon}
          accessoryRight={StarIcon}>
          <Text style={styles.title}>কেন ডাকবেন ?</Text>
        </Button>
        <Card style={{marginHorizontal: 13, paddingTop: 10}}>
          {whyToCall.map(a => (
            <RenderItem data={a} />
          ))}
        </Card>
        <ContactButtons navigation={navigation} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    // justifyContent: 'flex-start',
    borderRadius: 40,
    marginTop: 10,
    margin: 13,
    backgroundColor: theme.color_secondary,
    color: theme.light_text,
    borderColor: 'white',
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  card: {
    marginHorizontal: 13,
    paddingTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
});
export default Membership;
