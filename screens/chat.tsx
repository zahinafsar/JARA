/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {Button, Icon, Input, Spinner} from '@ui-kitten/components';
import {Context} from '../store';
import {theme} from '../theme';
import $alert from '../helper/alert';

let firstLoad = true;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [state, setState] = useContext(Context);
  // const [numberOfDoc, setNumberOfDoc] = React.useState(15);
  const [last, setLast] = React.useState({});
  const [loader, seLoader] = React.useState(false);
  const pageLimit = 13;

  useEffect(() => {
    setMessages([]);
    const subscribe = firestore()
      .collection('chat')
      .doc(state.uid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(pageLimit)
      .onSnapshot(data => {
        // setLast(data.docs[data.docs.length - 1].data().createdAt);
        // console.log(data.docs[data.docs.length - 1].data().createdAt);
        data.docChanges().forEach(e => {
          if (e.type === 'added') {
            let updates = e.doc.data();
            // console.log(updates);
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, {
                ...updates,
                createdAt: updates.createdAt
                  ? updates.createdAt.toDate()
                  : new Date(),
              }),
            );
          }
        });
      });
    return () => subscribe();
  }, []);

  async function getNext() {
    seLoader(true);
    const data = await firestore()
      .collection('chat')
      .doc(state.uid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .startAfter(messages[messages.length - 1].createdAt)
      .limit(pageLimit)
      .get();
    if (data.docs.length) {
      setLast(data.docs[data.docs.length - 1].data().createdAt);
      data.docs.forEach(e => {
        let updates = e.data();
        // console.log(updates);
        setMessages(previousMessages =>
          GiftedChat.append(
            {
              ...updates,
              createdAt: updates.createdAt
                ? updates.createdAt.toDate()
                : new Date(),
            },
            previousMessages,
          ),
        );
        seLoader(false);
      });
    } else {
      // alert('No more data');
      $alert('No more chat');
      seLoader(false);
    }
  }
  function sortMessage() {
    return messages.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  const onSend = useCallback((message = []) => {
    firestore()
      .collection('chat')
      .doc(state.uid)
      .collection('messages')
      .add({...message[0], createdAt: firestore.FieldValue.serverTimestamp()});
  }, []);

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'white',
          borderTopWidth: 0,
          margin: 10,
          borderRadius: 30,
          padding: 10,
        }}
      />
    );
  };
  const customtSendButton = props => {
    return (
      <Send
        {...props}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Icon
          style={{width: 30, height: 30}}
          fill={theme.primary_1}
          name="paper-plane-outline"
        />
      </Send>
    );
  };

  return (
    <>
      <Button
        style={{borderRadius: 0}}
        status="warning"
        accessoryRight={() =>
          loader ? (
            <Spinner
              status="basic"
              style={{width: 15, height: 15}}
              size="large"
            />
          ) : (
            <></>
          )
        }
        // onPress={() => setNumberOfDoc(numberOfDoc + 15)}
        onPress={() => (messages[0].createdAt ? getNext() : '')}
        size="tiny">
        <Text style={{fontSize: 10}}>load old messages</Text>
      </Button>
      {/* {loader ? <View style={{alignItems: 'center'}} /> : <></>} */}
      <GiftedChat
        messages={sortMessage()}
        alwaysShowSend={true}
        // renderTime={() => {}}
        onSend={message => {
          message[0].text ? onSend(message) : {};
        }}
        renderInputToolbar={props => customtInputToolbar(props)}
        renderSend={props => customtSendButton(props)}
        listViewProps={{
          contentContainerStyle: {
            paddingVertical: 30,
          },
        }}
        user={{
          _id: 1,
          name: 'Client',
          // avatar: require('../assets/logo.png'),
        }}
      />
    </>
  );
}

export default Chat;
