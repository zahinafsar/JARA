import React from 'react';
import {View, StyleSheet, Vibration, Dimensions, Platform} from 'react-native';
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

let configuration;

function Call() {
  const [localStream, setLocalStream] = React.useState();
  const [remoteStream, setRemoteStream] = React.useState();
  const [cachedLocalPC, setCachedLocalPC] = React.useState();
  const [incall, setIncall] = React.useState(false);
  const [ring, setRing] = React.useState(false);
  const [calling, setCalling] = React.useState(false);
  const [camera, setCamera] = React.useState(true);
  const [mic, setMic] = React.useState(true);

  React.useEffect(() => {
    getStart();
    listen();
  }, []);

  async function listen() {
    await firestore()
      .collection('calls')
      .doc('123456789')
      .onSnapshot(data => {
        const isCalling = data?.data()?.calling;
        if (isCalling === true) {
          setRing(true);
          vibrate(true);
        } else {
          setRing(false);
        }
      });
  }

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

  const startLocalStream = async () => {
    const constraints = {
      audio: true,
      video: true,
    };
    let newStream;
    try {
      newStream = await mediaDevices.getUserMedia(constraints);
    } catch (error) {
      console.log(newStream);
    }
    setLocalStream(newStream);
  };

  async function endCall(id) {
    getStart();
    vibrate(false);
    setRing(false);
    setIncall(false);
    setRemoteStream();
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
  }

  const call = async id => {
    setCalling(true);
    const pc = new RTCPeerConnection(configuration);
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
        setIncall(true);
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
          } catch (error) {
            console.log(error);
          }
        }
      });
    });

    setCachedLocalPC(pc);
  };
  const vibrate = on => {
    if (on) {
      const PATTERN = [500, 1500, 500];
      Vibration.vibrate(PATTERN, true);
    } else {
      Vibration.cancel();
    }
  };
  const receive = async id => {
    const pc = new RTCPeerConnection(configuration);
    console.log(configuration);
    console.log(pc);
    let callDoc;
    let roomSnapshot;
    try {
      callDoc = await firestore().collection('calls').doc(id);
      roomSnapshot = await callDoc.get();
    } catch (error) {
      console.log(error);
    }

    if (!roomSnapshot.exists) {
      return;
    }
    pc.addStream(localStream);

    const answerCandidates = callDoc.collection('answerCandidates');
    pc.onicecandidate = e => {
      if (!e.candidate) {
        setIncall(true);
        console.log('Got final candidate!');
        return;
      }
      answerCandidates.add(e.candidate.toJSON());
    };

    pc.onaddstream = e => {
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream join', e.stream);
        setRemoteStream(e.stream);
      }
    };

    const offer = roomSnapshot.data().offer;
    try {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
    } catch (error) {
      console.log(error);
    }

    const answer = await pc.createAnswer();
    try {
      await pc.setLocalDescription(answer);
    } catch (error) {
      console.log(error);
    }
    const roomWithAnswer = {answer};
    try {
      await callDoc.update(roomWithAnswer);
    } catch (error) {
      console.log(error);
    }

    callDoc.collection('callerCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          try {
            await pc.addIceCandidate(new RTCIceCandidate(data));
          } catch (error) {
            console.log(error);
          }
        }
      });
    });

    vibrate(false);
    try {
      await callDoc.set({calling: false});
    } catch (error) {
      console.log(error);
    }
    setCachedLocalPC(pc);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };

  const toggleCamera = () => {
    // if (camera) {
    //   localStream.getVideoTracks().forEach(track => track.stop());
    //   setCamera(!camera);
    // } else {
    //   localStream.getVideoTracks().forEach(track => track.release());
    //   setCamera(!camera);
    // }
  };

  const toggleMute = () => {
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
      setMic(!mic);
    });
  };

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
      {!incall ? (
        <View style={styles.buttons}>
          {!ring ? (
            <Button
              style={{margin: 5}}
              onPress={() => call('123456789')}
              status="warning">
              Call
            </Button>
          ) : (
            <>
              <Button
                style={{margin: 5}}
                onPress={() => receive('123456789')}
                status="success">
                Receive
              </Button>
              <Button
                style={{margin: 5}}
                onPress={() => endCall()}
                status="danger">
                End Call
              </Button>
            </>
          )}
        </View>
      ) : (
        <View style={styles.buttons}>
          <Button style={{margin: 5}} onPress={() => endCall()} status="danger">
            End Call
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    // alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Call;
