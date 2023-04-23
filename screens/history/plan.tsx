import React, {useEffect, useState} from 'react';
import CountDown from 'react-native-countdown-component';
import {View, Image} from 'react-native';
import {Button, Icon, Text} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import $alert from '../../helper/alert';
import {theme} from '../../theme';

const Service = (props: any) => (
  <Icon {...props} fill="black" name="shopping-bag-outline" />
);

function Plan({navigation}) {
  const [loader, setLoader] = useState(false);
  const [plan, setPlan] = useState();
  const [time, setTime] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoader(true);
    const id = await AsyncStorage.getItem('uid');
    const orderData = await firestore().collection('plans');
    orderData
      .where('userId', '==', id)
      .where('status', '==', 'active')
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(doc => {
          setPlan(doc.data());
          // console.log(doc.data());
          const oneYearInSecond = 31556926;
          const todaysInSecond = Date.now() / 1000;
          const activitionDate = doc.data()?.createdAt?.seconds;
          setTime(
            parseInt(oneYearInSecond - (todaysInSecond - activitionDate)),
          );
        });
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };

  if (!time && loader) {
    return null;
  } else if (!loader && !time) {
    return (
      <View
        style={{
          padding: 5,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPress={() => {
            navigation.navigate('Home');
          }}
          status="danger"
          appearance="outline"
          style={{position: 'absolute', bottom: 20}}>
          No Active Plans Found! Let's Get One
        </Button>
      </View>
    );
  } else {
    return (
      <>
        <View
          style={{
            marginBottom: 50,
            padding: 5,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: 250,
              height: 250,
              marginLeft: '10%',
              resizeMode: 'contain',
            }}
            source={require('../../assets/profile/clock.png')}
          />
          <CountDown
            until={time}
            onFinish={() => $alert('finished')}
            onPress={() => $alert('hello')}
            digitStyle={{
              height: 50,
              backgroundColor: theme.primary_2,
            }}
            digitTxtStyle={{
              color: 'white',
            }}
            timeLabelStyle={{fontSize: 12, marginTop: 5, color: '#000'}}
            size={30}
          />
          <Button
            accessoryLeft={props => (
              <View style={{flexDirection: 'row', marginRight: 15}}>
                <Service {...props} />
                <Text>Your {plan?.related_service} is Active</Text>
              </View>
            )}
            appearance="outline"
            style={{
              position: 'absolute',
              bottom: -20,
              marginVertical: 5,
              backgroundColor: 'white',
              elevation: 3,
            }}
            status="control"
          />
          {/* <View
            style={{
              height: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text category="c1" style={{opacity: 0.5}}>
              Swipe left to cencel order
            </Text>
            <Icon
              fill="red"
              name="close-circle-outline"
              style={{width: 17, height: 17, marginLeft: 5}}
            />
          </View>
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={loader} onRefresh={fetchData} />
            }
            data={orders}
            renderItem={data => (
              <Plans
                key={data.index}
                service={data.item.related_service}
                time={data.item.createdAt}
                status={data.item.status}
              />
            )}
            renderHiddenItem={data =>
              data.item.status === 'pending' ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  <Button
                    onPress={() => cencelOrder(data.item.id)}
                    style={{marginRight: 10}}
                    status="danger"
                    size="tiny">
                    Cancel
                  </Button>
                </View>
              ) : null
            }
            rightOpenValue={-85}
          /> */}
        </View>
      </>
    );
  }
}

export default Plan;
