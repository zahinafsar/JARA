/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Button, Icon, Input, Spinner} from '@ui-kitten/components';
import {Context} from '../store';
import {theme} from '../theme';
import $alert from '../helper/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import ImageUploader from '../helper/ImageUploader';

function Chat({navigation}) {
  const [messages, setMessages] = useState([]);
  const [imageloader, setImageLoader] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useContext(Context);
  const [last, setLast] = useState({});
  const [loader, seLoader] = useState(false);
  const pageLimit = 13;

  const db = firestore()
    .collection('chat')
    .doc(state.uid)
    .collection('messages');

  async function getNext() {
    // console.log('getting next data');
    seLoader(true);
    const data = await db
      .orderBy('createdAt', 'desc')
      .startAfter(messages[messages.length - 1].createdAt)
      .limit(pageLimit)
      .get();
    if (data.docs.length) {
      setLast(data.docs[data.docs.length - 1].data().createdAt);
      data.docs.forEach(e => {
        let updates = e.data();
        setMessages((previousMessages: any) => {
          return [...previousMessages, updates];
        });
        seLoader(false);
      });
    } else {
      $alert('No more chat');
      seLoader(false);
    }
  }

  useEffect(() => {
    setMessages([]);
    const subscribe = db
      .orderBy('createdAt', 'asc')
      .limitToLast(pageLimit)
      .onSnapshot(data => {
        data.docChanges().forEach(e => {
          if (e.type === 'added') {
            let updates = e.doc.data();
            setMessages((previousMessages: any) => {
              return [updates, ...previousMessages];
            });
          }
        });
      });
    return () => subscribe();
  }, []);

  // const onScroll = (e: any) => {
  //   if (yOffset <= 0 && e.nativeEvent.contentOffset.y > 0) {
  //     console.log('getting next data');
  //     getNext();
  //   }
  //   setyOffset(e.nativeEvent.contentOffset.y);
  // };
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    if (!loader) {
      const paddingToBottom = 5;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    }
  };

  const handleImage = async () => {
    setImageLoader(true);
    try {
      const image = await ImageUploader(state.uid);
      await send(image, 'file');
      setImageLoader(false);
    } catch (error) {
      setImageLoader(false);
    }
  };

  const send = async (message: any, type: 'text' | 'file') => {
    setText('');
    const id = await AsyncStorage.getItem('uid');
    await db.add({
      message: type === 'text' ? message : '',
      image: type === 'file' ? message : '',
      sendFrom: id,
      isAdmin: false,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <View style={{flex: 1}}>
      {loader && (
        <View style={styles.loader}>
          <Text style={styles.loaderText}>loading...</Text>
        </View>
      )}
      <FlatList
        inverted={true}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            getNext();
          }
        }}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}: any) => (
          <View
            style={{
              padding: 10,
              alignItems: !item.isAdmin ? 'flex-end' : 'flex-start',
            }}>
            <View
              style={{
                flexDirection: item.isAdmin ? 'row' : 'row-reverse',
                alignItems: 'center',
              }}>
              {!item.image ? (
                <Text style={!item.isAdmin ? styles.myChat : styles.othersChat}>
                  {item.message}
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('viewImage', item.image)}
                  style={styles.image}>
                  <Image
                    style={{
                      borderRadius: 20,
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                    source={{uri: item.image}}
                  />
                </TouchableOpacity>
              )}
              <Text style={{marginHorizontal: 10, opacity: 0.4, fontSize: 10}}>
                {moment(item?.createdAt?.toDate()).fromNow()}
              </Text>
            </View>
          </View>
        )}
      />
      <View>
        <View
          style={{
            bottom: 0,
            height: 80,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: 'gray',
              borderWidth: 1.5,
              borderRadius: 50,
              paddingLeft: 8,
              paddingTop: 3,
            }}>
            {!imageloader ? (
              <TouchableOpacity onPress={handleImage} style={styles.sendIcon}>
                <Icon
                  style={{width: 30, height: 30}}
                  fill={theme.primary_1}
                  name="plus-circle"
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.sendIcon}>
                <Spinner status="info" size="large" />
              </View>
            )}
            <TextInput
              value={text}
              onChangeText={v => setText(v)}
              multiline
              style={{height: 50, width: '75%'}}
            />
            <TouchableOpacity
              onPress={() => send(text, 'text')}
              style={styles.sendIcon}>
              <Icon
                style={{width: 30, height: 30, marginRight: 10}}
                fill={theme.primary_1}
                name="paper-plane-outline"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 130,
  },
  loader: {
    opacity: 0.4,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    backgroundColor: 'white',
    textAlign: 'center',
    borderColor: 'black',
    borderRadius: 10,
    paddingVertical: 2,
    borderWidth: 1,
    width: 90,
  },
  chats: {
    backgroundColor: 'green',
    padding: 10,
  },
  myChat: {
    color: 'white',
    backgroundColor: theme.primary_1,
    padding: 10,
    maxWidth: '80%',
    borderRadius: 10,
  },
  othersChat: {
    color: 'black',
    padding: 10,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  sendIcon: {
    borderRadius: 50,
  },
  icon: {
    position: 'absolute',
    height: 40,
    justifyContent: 'center',
    width: '100%',
    marginHorizontal: 10,
  },
  card: {
    marginVertical: 0,
    marginHorizontal: 0,
    elevation: 0,
  },
  time: {
    fontSize: 12,
    color: theme.primary_2,
  },
});

export default Chat;
