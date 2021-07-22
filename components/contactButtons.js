import React from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {Button, Icon, Modal, Card} from '@ui-kitten/components';

const MessageIcon = props => <Icon {...props} name="message-square" />;
const CallIcon = props => <Icon {...props} name="phone-call" />;

function ContactButtons({navigation}) {
  const [visible, setVisible] = React.useState(false);
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
        {!visible ? (
          <Button
            style={styles.button}
            onPress={() => setVisible(true)}
            status="info"
            accessoryRight={CallIcon}>
            Live Call
          </Button>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Button
              status="info"
              style={{width: '49%'}}
              onPress={() => {
                Linking.openURL('tel: 01819459974');
                setVisible(false);
              }}>
              Call Offline
            </Button>
            <Button
              status="info"
              style={{width: '49%'}}
              onPress={() => {
                Linking.openURL('whatsapp://send?phone=+8801819459974');
                setVisible(false);
              }}>
              Call Online
            </Button>
          </View>
        )}
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
