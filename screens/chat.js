/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context} from '../store';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [state, setState] = useContext(Context);

  useEffect(() => {
    const subscribe = firestore()
      .collection('chat')
      .doc(state.uid)
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
  }, []);

  const onSend = useCallback((message = []) => {
    firestore()
      .collection('chat')
      .doc(state.uid)
      .collection('messages')
      .add({...message[0], createdAt: firestore.FieldValue.serverTimestamp()});
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={message => onSend(message)}
      user={{
        _id: 2,
        name: 'Admin',
        avatar: require('../assets/logo.png'),
      }}
    />
  );
}

export default Chat;
