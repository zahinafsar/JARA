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
const RightArrow = props => <Icon {...props} name="arrow-right-outline" />;

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
  'Repair broken parts',
  'Find and fix unknows issues',
  'Laptop cleaning',
  'Change Laptop Parts',
];

const software = [
  'Oparation System upgread',
  'Fix virus problem',
  'Data recovary',
  'Install drivers',
  'Repair drivers',
  'Software install',
];

function Laptop({navigation}) {
  const RenderItem = ({data}) => {
    return (
      <>
        {data.map(a => {
          return (
            <>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  style={{height: 20, width: 20, marginRight: 15}}
                  fill="#8F9BB3"
                  name="arrow-right-outline"
                />
                <Text>{a}</Text>
              </View>
              <Divider style={{marginVertical: 13}} />
            </>
          );
        })}
      </>
    );
  };
  return (
    <>
      <ScrollView style={{}}>
        <View style={{flex: 1, alignItems: 'center', marginVertical: 30}}>
          <Image source={require('../../../assets/services/page/laptop.png')} />
        </View>
        {/* <Text style={styles.title} category="h6">
          Why this Service
        </Text> */}
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
      </ScrollView>
      <View>
        <Button status="warning" onPress={() => navigation.navigate('procced')}>
          Procced
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
    backgroundColor: theme.color_primary,
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

export default Laptop;
