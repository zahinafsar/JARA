/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [token, setToken] = React.useState('');

  async function isLoggrfIn() {
    const value = await AsyncStorage.getItem('uid');
    if (value) {
      setToken(value);
    }
    const subscribe = firestore()
      .collection('chat')
      .doc(token)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(data => {
        data.docChanges().forEach(e => {
          //   console.log(e);
          if (e.type === 'added') {
            let updates = e.doc.data();
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
  }

  useEffect(() => {
    isLoggrfIn();
  }, []);

  const onSend = useCallback((message = []) => {
    firestore()
      .collection('chat')
      .doc(token)
      .collection('messages')
      .add({...message[0], createdAt: firestore.FieldValue.serverTimestamp()});
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={message => onSend(message)}
      user={{
        _id: 2,
        name: 'client',
      }}
    />
  );
}

export default Chat;
