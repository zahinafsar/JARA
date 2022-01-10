import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, ScrollView, Linking} from 'react-native';
import {Button, ButtonProps, Icon, Text} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const hardware = [
  'Contacts assembling',
  'Repair hardware components',
  'Find & Fix unknown issues',
  'PC cleaning',
  'Upgrade components',
];

const Service = (props: any) => <Icon {...props} name="shopping-bag-outline" />;

const ServiceHistory = ({service, status}: any) => (
  <Button
    accessoryLeft={props => (
      <View style={{flexDirection: 'row'}}>
        <Service {...props} />
        <Text style={{opacity: 0.5}}>{service}</Text>
      </View>
    )}
    accessoryRight={() => (
      <Button status="info" size="tiny">
        {status}
      </Button>
    )}
    appearance="outline"
    style={{marginBottom: 10, justifyContent: 'space-between'}}
    status="primary"
  />
);

function History({navigation}) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const id = await AsyncStorage.getItem('uid');
      const orderData = await firestore().collection('orders');
      orderData
        .where('userId', '==', id)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => {
            return {...doc.data(), id: doc.id};
          });
          setOrders(data);
          orders.map(r => {
            console.log(r.status);
          });
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <View style={{margin: 5}}>
        {orders.map(order => (
          <ServiceHistory
            service={order.related_service}
            status={order.status}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});

export default History;
