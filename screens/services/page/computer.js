import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {
  Button,
  Card,
  Text,
  Icon,
  List,
  ListItem,
  Divider,
} from '@ui-kitten/components';
import {theme} from '../../../theme';

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

const hardware = [
  'Computer assembling',
  'Repair hardware components',
  'Find & Fix unknown issues',
  'PC cleaning',
  'Upgrade components',
];

const software = [
  'Oparation System upgrade',
  'Oparation System installation',
  'Software installation',
  'Install drivers',
  'Fix virus problem',
  'Data recovery',
];

const rate = [
  'Onsite Service = 600 tk',
  '2nd Time Onsite Service = 300 tk',
  'In House Service = 400 tk',
  'Online Remote Support = 300 tk',
];

function Computer({navigation}) {
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
              <Divider style={{marginVertical: 13}} />
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
            source={require('../../../assets/services/page/computer.png')}
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
            Are you fed up with the inconvenience of dismantling your computer
            and lugging it to a repair shop every time it needs service – only
            to be kept waiting a week or more to get it back? There’s a better
            way – we come to you for the best onsite computer repair services
            and help
          </Text>
        </Card>
        <Button style={styles.button} status="info" accessoryLeft={StarIcon}>
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
        </Card>
        <Button
          onPress={() => {
            navigation.navigate('membership');
          }}
          // accessoryRight={Arrow}
          status="warning"
          style={{marginHorizontal: 13, marginBottom: 20, elevation: 5}}>
          ১ বছরের Home Service মাত্র ১০০০/= টাকা
        </Button>
      </ScrollView>
      <View>
        <Button status="warning" onPress={() => navigation.navigate('confirm')}>
          Next
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-start',
    borderRadius: 40,
    marginTop: 10,
    margin: 13,
    backgroundColor: theme.color_secondary,
    color: theme.light_text,
    borderColor: 'white',
  },
  title: {
    marginTop: 30,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    fontWeight: 'bold',
    elevation: 2,
  },
  card: {
    marginHorizontal: 13,
    paddingTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
});

export default Computer;
