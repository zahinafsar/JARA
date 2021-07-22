import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {Button, Card, Text, Icon} from '@ui-kitten/components';
import {theme} from '../../../theme';

const StarIcon = props => <Icon {...props} name="star" />;

const InfoBtn = props => {
  return (
    <>
      <Button style={styles.button} status="primary" accessoryLeft={StarIcon}>
        {props.title}
      </Button>
      <Card style={{marginTop: -20, zIndex: -1}}>
        <View style={{lineHeight: 18, marginTop: 20}}>{props.children}</View>
      </Card>
    </>
  );
};

function Computer({navigation}) {
  return (
    <>
      <ScrollView style={{}}>
        <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
          <Image
            source={require('../../../assets/services/page/computer.png')}
          />
        </View>
        <Text
          style={{
            marginTop: 30,
            padding: 8,
            backgroundColor: theme.color_green,
            color: 'white',
          }}
          category="h6">
          Why this Service
        </Text>
        <Text
          style={{
            lineHeight: 21,
            fontWeight: 'bold',
            fontSize: 14,
            margin: 20,
          }}>
          Are you fed up with the inconvenience of dismantling your computer and
          lugging it to a repair shop every time it needs service – only to be
          kept waiting a week or more to get it back? There’s a better way – we
          come to you for the best onsite computer repair services and help
        </Text>
        <Text
          style={{
            padding: 8,
            backgroundColor: theme.color_green,
            color: 'white',
          }}
          category="h6">
          What We Provide
        </Text>
        <View style={{margin: 13}}>
          <InfoBtn title="Hardware Service">
            <Text>1. Repair broken PC parts.</Text>
            <Text>2. Find unknown issues.</Text>
            <Text>3. Fix unknows issues.</Text>
            <Text>4. PC cleaning.</Text>
            <Text>5. PC setup.</Text>
            <Text>6. Change PC setup.</Text>
          </InfoBtn>
          <InfoBtn title="Software Service">
            <Text>1. Oparation System upgread.</Text>
            <Text>2. Fix virus problem.</Text>
            <Text>3. Data recovary.</Text>
            <Text>4. Install drivers.</Text>
            <Text>5. Repair drivers.</Text>
            <Text>6. Software install.</Text>
          </InfoBtn>
        </View>
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
  },
});

export default Computer;
