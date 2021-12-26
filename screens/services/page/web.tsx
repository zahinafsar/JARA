import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {Button, Card, Text, Icon, Divider} from '@ui-kitten/components';
import {theme} from '../../../theme';
import Pricing from '../../../components/pricing';
import { service } from '../../../repository';

const StarIcon = props => <Icon {...props} name="star" />;
const Arrow = props => <Icon {...props} name="arrow-forward-outline" />;
// const InfoBtn = props => {
//   return (
//     <>
//       <Button style={styles.button} status="info" accessoryLeft={StarIcon}>
//         {props.title}
//       </Button>
//       <Card style={styles.card}>
//         <View style={{lineHeight: 18}}>{props.children}</View>
//       </Card>
//     </>
//   );
// };

// const types = [
//   'E-commarse site',
//   'Mannageemnt site',
//   'Admin panel',
// ];

const ecom = [
  'Onsite Service = 600 tk',
  '2nd Time Onsite Service = 300 tk',
  'In House Service = 400 tk',
  'Online Remote Support = 300 tk',
];

function Web({navigation}) {
  const RenderItem = ({data}) => {
    return (
      <>
        {data.map(a => {
          return (
            <View key={a}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  style={{height: 20, width: 20, marginRight: 15}}
                  fill="#8F9BB3"
                  name="arrow-right-outline"
                />
                <Text>{a}</Text>
              </View>
              <Pricing />
            </View>
          );
        })}
      </>
    );
  };
  return (
    <>
      <ScrollView style={{}}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 250, height: 250, resizeMode: 'contain'}}
            source={require('../../../assets/services/page/web.png')}
          />
        </View>
        <Button style={styles.button} status="info" accessoryLeft={StarIcon}>
          About this service
        </Button>
        <Card style={styles.card}>
          <Text
            style={{
              lineHeight: 21,
              fontSize: 14,
            }}>
            Do you need to start a website? We provide the best product to you.
            Using the best technologies we try to supply the best performance
            optimised sites.
          </Text>
        </Card>
        {/* <Button style={styles.button} status="info" accessoryLeft={StarIcon}>
          Hardware Services
        </Button>
        <Card style={styles.card}>
          <RenderItem data={hardware} />
        </Card>
        <Button style={styles.button} status="info" accessoryLeft={StarIcon}>
          Software Services
        </Button>
        <Card style={styles.card}>
          <RenderItem data={software} />
        </Card>
        <Button style={styles.button} status="info" accessoryLeft={StarIcon}>
          Service Rate
        </Button>
        <Card style={styles.card}>
          <RenderItem data={rate} />
        </Card> */}
        {/* <Button
          onPress={() => {
            navigation.navigate('membership');
          }}
          // accessoryRight={Arrow}
          status="warning"
          style={{marginHorizontal: 13, marginBottom: 20, elevation: 5}}>
          ১ বছরের Home Service মাত্র ১০০০/= টাকা
        </Button> */}
      </ScrollView>
      <View>
        <Button status="warning" onPress={() => navigation.navigate('confirm', {name:service[5]})}>
          Next
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 65,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 13,
    marginBottom: -10,
    backgroundColor: theme.primary_1,
    color: theme.light_text,
    borderColor: 'white',
  },
  card: {
    marginHorizontal: 13,
    marginTop: -10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
});

export default Web;
