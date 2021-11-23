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

const data = new Array(8).fill({
  title: 'Item',
});

const pcService = [
  'Repair broken PC parts',
  'Find unknown issues',
  'Fix unknows issues',
  'PC cleaning',
  'PC setup',
  'Change PC setup',
];

const laptopService = [
  'Oparation System upgread',
  'Fix virus problem',
  'Data recovary',
  'Install drivers',
  'Repair drivers',
  'Software install',
];

function Computer({navigation}) {
  const renderItem = ({item, index}) => (
    <ListItem
      style={{marginHorizontal: -15}}
      accessoryLeft={RightArrow}
      title={item}
    />
  );
  return (
    <>
      <ScrollView style={{}}>
        <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
          <Image
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
          <List
            data={pcService}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
        </Card>
        <Button style={styles.button} status="info" accessoryLeft={StarIcon}>
          Software Services
        </Button>
        <Card style={styles.card}>
          <List
            data={laptopService}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
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
  },
  title: {
    marginTop: 30,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: theme.color_primary,
    color: theme.light_text,
    fontWeight: 'bold',
    elevation: 2,
  },
  card: {
    marginHorizontal: 13,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
});

export default Computer;
