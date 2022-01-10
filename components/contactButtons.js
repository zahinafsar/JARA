import React from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {Button, Icon, Modal, Card} from '@ui-kitten/components';
import {Context} from '../store';
import $alert from '../helper/alert';

const MessageIcon = props => <Icon {...props} name="message-square" />;
const CallIcon = props => <Icon {...props} name="phone-call" />;
const Close = props => <Icon {...props} name="close-outline" />;
function ContactButtons({navigation}) {
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = React.useContext(Context);
  return (
    <View style={{marginTop: 10, width: '100%'}}>
      <View style={styles.socialBtn}>
        <Button
          onPress={() => navigation.navigate('chat')}
          style={styles.button}
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
            status="primary"
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
              status="primary"
              style={{width: '43%', elevation: 4}}
              onPress={() => {
                navigation.navigate('contacts');
                setVisible(false);
              }}>
              Offline
            </Button>
            <Button
              status="primary"
              style={{width: '43%', elevation: 4}}
              onPress={() => {
                // setVisible(false);
                // navigation.navigate('call');
                $alert('This service is under development');
              }}>
              Online
            </Button>
            <Button
              status="warning"
              style={{width: '8%', elevation: 4}}
              accessoryLeft={Close}
              onPress={() => setVisible(false)}
            />
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
  button: {
    elevation: 4,
    justifyContent: 'space-between',
  },
});

export default ContactButtons;
