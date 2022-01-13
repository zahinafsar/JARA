// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, {useState, useCallback, useEffect, useContext} from 'react';
// import {View, TouchableOpacity, Text} from 'react-native';
// import {GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
// import firestore from '@react-native-firebase/firestore';
import {Button, Icon, Input, Spinner} from '@ui-kitten/components';
// import {Context} from '../store';
// import {theme} from '../theme';
// import $alert from '../helper/alert';

// let firstLoad = true;

// function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [state, setState] = useContext(Context);
//   // const [numberOfDoc, setNumberOfDoc] = React.useState(15);
//   const [last, setLast] = React.useState({});
//   const [loader, seLoader] = React.useState(false);
//   const pageLimit = 13;

//   useEffect(() => {
//     setMessages([]);
//     const subscribe = firestore()
//       .collection('chat')
//       .doc(state.uid)
//       .collection('messages')
//       .orderBy('createdAt', 'desc')
//       .limit(pageLimit)
//       .onSnapshot(data => {
//         // setLast(data.docs[data.docs.length - 1].data().createdAt);
//         // console.log(data.docs[data.docs.length - 1].data().createdAt);
//         data.docChanges().forEach(e => {
//           if (e.type === 'added') {
//             let updates = e.doc.data();
//             // console.log(updates);
//             setMessages(previousMessages =>
//               GiftedChat.append(previousMessages, {
//                 ...updates,
//                 createdAt: updates.createdAt
//                   ? updates.createdAt.toDate()
//                   : new Date(),
//               }),
//             );
//           }
//         });
//       });
//     return () => subscribe();
//   }, []);

//   async function getNext() {
//     seLoader(true);
//     const data = await firestore()
//       .collection('chat')
//       .doc(state.uid)
//       .collection('messages')
//       .orderBy('createdAt', 'desc')
//       .startAfter(messages[messages.length - 1].createdAt)
//       .limit(pageLimit)
//       .get();
//     if (data.docs.length) {
//       setLast(data.docs[data.docs.length - 1].data().createdAt);
//       data.docs.forEach(e => {
//         let updates = e.data();
//         // console.log(updates);
//         setMessages(previousMessages =>
//           GiftedChat.append(
//             {
//               ...updates,
//               createdAt: updates.createdAt
//                 ? updates.createdAt.toDate()
//                 : new Date(),
//             },
//             previousMessages,
//           ),
//         );
//         seLoader(false);
//       });
//     } else {
//       // alert('No more data');
//       $alert('No more chat');
//       seLoader(false);
//     }
//   }
//   function sortMessage() {
//     return messages.sort(function (a, b) {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });
//   }

//   const onSend = useCallback((message = []) => {
//     firestore()
//       .collection('chat')
//       .doc(state.uid)
//       .collection('messages')
//       .add({...message[0], createdAt: firestore.FieldValue.serverTimestamp()});
//   }, []);

//   const customtInputToolbar = props => {
//     return (
//       <InputToolbar
//         {...props}
//         containerStyle={{
//           backgroundColor: 'white',
//           borderTopWidth: 0,
//           margin: 10,
//           borderRadius: 30,
//           padding: 10,
//         }}
//       />
//     );
//   };
//   const customtSendButton = props => {
//     return (
//       <Send
//         {...props}
//         containerStyle={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: 10,
//         }}>
//         <Icon
//           style={{width: 30, height: 30}}
//           fill={theme.primary_1}
//           name="paper-plane-outline"
//         />
//       </Send>
//     );
//   };

//   return (
//     <>
//       <Button
//         style={{borderRadius: 0}}
//         status="warning"
//         accessoryRight={() =>
//           loader ? (
//             <Spinner
//               status="basic"
//               style={{width: 15, height: 15}}
//               size="large"
//             />
//           ) : (
//             <></>
//           )
//         }
//         // onPress={() => setNumberOfDoc(numberOfDoc + 15)}
//         onPress={() => (messages[0].createdAt ? getNext() : '')}
//         size="tiny">
//         <Text style={{fontSize: 10}}>load old messages</Text>
//       </Button>
//       {/* {loader ? <View style={{alignItems: 'center'}} /> : <></>} */}
//       <GiftedChat
//         messages={sortMessage()}
//         alwaysShowSend={true}
//         // renderTime={() => {}}
//         onSend={message => {
//           message[0].text ? onSend(message) : {};
//         }}
//         renderInputToolbar={props => customtInputToolbar(props)}
//         renderSend={props => customtSendButton(props)}
//         listViewProps={{
//           contentContainerStyle: {
//             paddingVertical: 30,
//           },
//         }}
//         user={{
//           _id: 1,
//           name: 'Client',
//           // avatar: require('../assets/logo.png'),
//         }}
//       />
//     </>
//   );
// }

// export default Chat;
import React from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {theme} from '../theme';

const chat = [
  {
    message: 'Hi, how are you?',
    time: '12:00',
    isMe: true,
  },
  {
    message:
      "I'm fine, thank you. m has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
    time: '12:01',
    isMe: false,
  },
  {
    message: 'What about you?',
    time: '12:02',
    isMe: false,
  },
  {
    message:
      'was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and ',
    time: '12:03',
    isMe: true,
  },
  {
    message:
      "and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over th",
    time: '12:04',
    isMe: false,
  },
  {
    message: "I'm Zahin Afsar",
    time: '12:05',
    isMe: true,
  },
  {
    message: 'Where are from?',
    time: '12:06',
    isMe: false,
  },
  {
    message: "I'm from Bangladesh",
    time: '12:07',
    isMe: true,
  },
  {
    message: 'Hi, how are you?',
    time: '12:00',
    isMe: true,
  },
  {
    message:
      "I'm fine, thank you. m has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
    time: '12:01',
    isMe: false,
  },
  {
    message: 'What about you?',
    time: '12:02',
    isMe: false,
  },
  {
    message:
      'was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and ',
    time: '12:03',
    isMe: true,
  },
  {
    message:
      "and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over th",
    time: '12:04',
    isMe: false,
  },
  {
    message: "I'm Zahin Afsar",
    time: '12:05',
    isMe: true,
  },
  {
    message: 'Where are from?',
    time: '12:06',
    isMe: false,
  },
  {
    message: "I'm from Bangladesh",
    time: '12:07',
    isMe: true,
  },
];

const Chat = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        inverted={-1}
        data={chat.reverse()}
        renderItem={({item, index}) => (
          <View
            key={index}
            style={{
              padding: 10,
              alignItems: item.isMe ? 'flex-end' : 'flex-start',
            }}>
            <View
              style={{
                flexDirection: !item.isMe ? 'row' : 'row-reverse',
                alignItems: 'center',
              }}>
              <Text style={item.isMe ? styles.myChat : styles.othersChat}>
                {item.message}
              </Text>
              <Text style={{marginHorizontal: 10, opacity: 0.4, fontSize: 10}}>
                {item.time}
              </Text>
            </View>
          </View>
        )}
      />
      <View>
        {/* <Hr style={{marginVertical: 0}} /> */}
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
            <View style={styles.sendIcon}>
              <Icon
                style={{width: 30, height: 30}}
                fill={theme.primary_1}
                name="plus-circle"
              />
            </View>
            <TextInput multiline style={{height: 50, width: '75%'}} />
            <View style={styles.sendIcon}>
              <Icon
                style={{width: 30, height: 30, marginRight: 10}}
                fill={theme.primary_1}
                name="paper-plane-outline"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chats: {
    // flex: 1,
    backgroundColor: 'green',
    // height: '100%',
    // flexDirection: 'column-reverse',
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
