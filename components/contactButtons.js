import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Icon} from '@ui-kitten/components';

const MessageIcon = props => <Icon {...props} name="message-square" />;
const CallIcon = props => <Icon {...props} name="phone-call" />;

function ContactButtons({navigation}) {
  return (
    <View style={{marginTop: 10, width: '100%'}}>
      <View style={styles.socialBtn}>
        <Button
          onPress={() => navigation.navigate('chat')}
          style={{...styles.button}}
          status="warning"
          accessoryRight={MessageIcon}>
          Live Chat
        </Button>
      </View>
      <View style={styles.socialBtn}>
        <Button style={styles.button} status="info" accessoryRight={CallIcon}>
          Live Call
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  socialBtn: {
    margin: 10,
  },
});

export default ContactButtons;
