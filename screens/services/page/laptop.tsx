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
import {service} from '../../../repository';

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
  'Find & fix unknown issues',
  'Laptop cleaning',
  'Change laptop parts',
];

const software = [
  'Oparation System upgrade',
  'Oparation System installation',
  'Software installation',
  'Install drivers',
  'Fix virus problem',
  'Data recovery',
];

function Laptop({navigation}) {
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
            source={require('../../../assets/services/page/laptop.png')}
          />
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
        <Button
          style={{borderRadius: 0}}
          status="warning"
          onPress={() => navigation.navigate('confirm', {name: service[1]})}>
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
export default Laptop;
