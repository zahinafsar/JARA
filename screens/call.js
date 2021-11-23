import React, {cloneElement} from 'react';
import {View, StyleSheet, Vibration, Dimensions, Text} from 'react-native';
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import firestore from '@react-native-firebase/firestore';
import {Button, Icon} from '@ui-kitten/components';
import axios from 'axios';
import {Context} from '../store';

let configuration;

function Call({navigation}) {
  const initialBtnText = 'Setting Up....';
  const [localStream, setLocalStream] = React.useState();
  const [remoteStream, setRemoteStream] = React.useState();
  // const [cachedLocalPC, setCachedLocalPC] = React.useState();
  const [incall, setIncall] = React.useState(false);
  // const [calling, setCalling] = React.useState(true);
  const [camera, setCamera] = React.useState(true);
  const [mic, setMic] = React.useState(true);
  const [btnText, setBtnText] = React.useState(initialBtnText);
  const [storePC, setPC] = React.useState();
  const CallIcon = props => <Icon {...props} name="phone-call" />;

  React.useEffect(() => {
    getStart();
    // listen();
  }, []);

  // async function listen() {
  //   await firestore()
  //     .collection('calls')
  //     .doc('123456789')
  //     .onSnapshot(data => {
  //       const isCalling = data?.data()?.calling;
  //       if (isCalling === true) {
  //         setBtnText('Ringing....');
  //         vibrate(true);
  //       } else {
  //         setCalling(false);
  //         vibrate(false);
  //       }
  //     });
  // }

  async function getStart() {
    const data = await axios.put(
      'https://global.xirsys.net/_turn/MyFirstApp',
      {},
      {
        headers: {
          Authorization:
            'Basic emFoaW5hZnNhcjplN2VkZWYyYS1mNDBiLTExZWItOWZlNC0wMjQyYWMxNTAwMDM=',
        },
      },
    );
    configuration = data.data.v;
    startLocalStream();
  }
  async function startLocalStream() {
    const constraints = {
      audio: true,
      video: true,
    };
    let newStream;
    try {
      newStream = await mediaDevices.getUserMedia(constraints);
    } catch (error) {
      console.log(error);
    }
    setLocalStream(newStream);
    setBtnText(false);
  }
  async function endCall(id) {
    if (btnText === !initialBtnText) {
      localStream.getAudioTracks().forEach(track => {
        track.stop();
      });
      localStream.getVideoTracks().forEach(track => track.stop());
      storePC.close();
      setIncall(false);
      setRemoteStream();
      setLocalStream();
      getStart();
    }
    navigation.navigate('Home');
    // vibrate(false);
    // console.log(localStream.getAudioTracks());
    // console.log(localStream.getVideoTracks());
    // setState({...state, loggedIn: 'loggedIn'});
  }
  async function call(id) {
    setBtnText('Calling....');
    const pc = new RTCPeerConnection(configuration);
    setPC(pc);
    pc.addStream(localStream);
    let callDoc;
    try {
      callDoc = await firestore().collection('calls').doc(id);
    } catch (error) {
      console.log(error);
    }
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');
    pc.onicecandidate = e => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
      offerCandidates.add(e.candidate.toJSON());
    };

    pc.onaddstream = e => {
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream call', e.stream);
        setRemoteStream(e.stream);
      }
    };
    let offerDescription;
    try {
      offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);
    } catch (error) {
      console.log(error);
    }

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };
    try {
      await callDoc.set({offer: offer, calling: true});
      setBtnText('Ringing....');
      // vibrate(true);
    } catch (error) {
      console.log(error);
    }

    callDoc.onSnapshot(async snapshot => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        try {
          await pc.setRemoteDescription(answerDescription);
        } catch (error) {
          console.log(error);
        }
      }
    });

    answerCandidates.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          try {
            await pc.addIceCandidate(new RTCIceCandidate(data));
            setIncall(true);
            setBtnText(false);
            // vibrate(false);
          } catch (error) {
            console.log(error);
          }
        }
      });
    });
    // setCachedLocalPC(pc);
  }
  function vibrate(on) {
    if (on) {
      const PATTERN = [500, 1500, 500];
      Vibration.vibrate(PATTERN, true);
    } else {
      Vibration.cancel();
    }
  }
  function switchCamera() {
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  }
  function toggleCamera() {
    // if (camera) {
    //   localStream.getVideoTracks().forEach(track => track.stop());
    //   setCamera(!camera);
    // } else {
    //   localStream.getVideoTracks().forEach(track => track.release());
    //   setCamera(!camera);
    // }
  }
  function toggleMute() {
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
      setMic(!mic);
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={styles.camView}>
        <RTCView
          style={styles.rtc2}
          streamURL={remoteStream && remoteStream.toURL()}
        />
        <RTCView
          style={styles.rtc}
          streamURL={localStream && localStream.toURL()}
        />
      </View>
      <View style={styles.actions}>
        <Button
          style={styles.button}
          appearance="ghost"
          status="danger"
          onPress={() => {
            switchCamera();
          }}
          accessoryLeft={() => (
            <Icon
              fill="white"
              style={styles.actionsButtons}
              name="repeat-outline"
            />
          )}
        />
        <Button
          style={styles.button}
          appearance="ghost"
          status="danger"
          onPress={() => {
            toggleMute();
          }}
          accessoryLeft={() => (
            <Icon
              fill="white"
              style={styles.actionsButtons}
              name={mic ? 'mic-outline' : 'mic-off-outline'}
            />
          )}
        />
        <Button
          style={styles.button}
          appearance="ghost"
          status="danger"
          onPress={async () => {
            toggleCamera();
          }}
          accessoryLeft={() => (
            <Icon
              fill="white"
              style={styles.actionsButtons}
              name={camera ? 'video-outline' : 'video-off-outline'}
            />
          )}
        />
      </View>
      <View style={styles.buttons}>
        {/* {!incall ? (
          btnText ? (
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.message}>{btnText}</Text>
              <Button onPress={() => endCall()} status="danger">
                End Call
              </Button>
            </View>
          ) : (
            <Button
              onPress={() => call('123456789')}
              status="danger"
              accessoryLeft={CallIcon}
            />
          )
        ) : (
          <></>
        )} */}
        {!btnText && !incall ? (
          <Button
            onPress={() => call('123456789')}
            status="danger"
            accessoryLeft={CallIcon}
          />
        ) : (
          <></>
        )}
        {btnText ? (
          <View style={styles.message}>
            <Text style={{fontSize: 15, color: 'white'}}>{btnText}</Text>
          </View>
        ) : (
          <></>
        )}
        {btnText || incall ? (
          <Button onPress={() => endCall()} status="danger">
            {btnText === initialBtnText ? 'Back' : 'End Call'}
          </Button>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    bottom: Dimensions.get('window').height / 2,
    position: 'absolute',
  },
  actions: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    bottom: 100,
  },
  actionsButtons: {
    width: 35,
    height: 35,
    margin: 10,
  },
  camView: {
    width: '100%',
  },
  rtc: {
    position: 'absolute',
    margin: 10,
    left: 0,
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').height / 5,
  },
  rtc2: {
    width: '100%',
    height: '100%',
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 30,
    width: '100%',
    justifyContent: 'center',
  },
});

export default Call;
