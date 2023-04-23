import React, {useContext} from 'react';
import {View, ScrollView, StyleSheet, StatusBar, Text} from 'react-native';
import MyCard from '../components/custom/card';
import ServiceCard from '../components/card';
import {computer_service, computer_toc} from '../repository/services/computer';
import {service} from '../repository';
import {Avatar} from '@ui-kitten/components';
import img from '../assets/profile/avatar.png';
import {theme} from '../theme';
import {Context} from '../store';
import Button from '../components/button';

const Home = ({navigation}) => {
  const [state] = useContext(Context);
  return (
    <>
      <ScrollView>
        <View style={styles.topbar}>
          <View>
            <View style={styles.basic}>
              <Avatar size="giant" source={img} style={{marginBottom: 15}} />
              {state.uid ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Welcome to JARA!
                </Text>
              ) : (
                <Button
                  size="small"
                  onPress={() => {
                    navigation.navigate('login');
                  }}>
                  Login to continue
                </Button>
              )}
            </View>
          </View>
          {/* <View style={styles.qrcode}>
            <QRCode value="0" size={70} />
          </View> */}
        </View>
        <MyCard
          style={{marginTop: 10, marginVertical: 5, marginHorizontal: 10}}
          onPress={() => {
            navigation.navigate('membership');
          }}
          title="Membership"
          subtitle="১০০০ টাকায় ১ বছরের Home Service"
        />
        <MyCard
          style={{marginVertical: 5, marginHorizontal: 10}}
          onPress={() => {
            navigation.navigate('monthly');
          }}
          title="Monthly Service"
          subtitle="Total Office IT Solution(Contract Basis)"
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <ServiceCard
              info={{
                service: computer_service,
                toc: computer_toc,
              }}
              onConfirm={() =>
                navigation.navigate('confirm', {name: service[0]})
              }
              title="Computer Service"
              img={require('../assets/services/computer.png')}
            />
            <ServiceCard
              info={{
                service: computer_service,
                toc: computer_toc,
              }}
              onConfirm={() =>
                navigation.navigate('confirm', {name: service[0]})
              }
              title="Laptop Service"
              img={require('../assets/services/laptop.png')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <ServiceCard
              info={{
                service: computer_service,
                toc: computer_toc,
              }}
              onConfirm={() =>
                navigation.navigate('confirm', {name: service[0]})
              }
              title="Printer Service"
              img={require('../assets/services/printer.png')}
            />
            <ServiceCard
              info={{
                service: computer_service,
                toc: computer_toc,
              }}
              onConfirm={() =>
                navigation.navigate('confirm', {name: service[0]})
              }
              title="CCTV Setup"
              img={require('../assets/services/camera.png')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <ServiceCard
              info={{
                service: computer_service,
                toc: computer_toc,
              }}
              onConfirm={() =>
                navigation.navigate('confirm', {name: service[0]})
              }
              title="Network Setup"
              img={require('../assets/services/network.png')}
            />
            <ServiceCard
              info={{
                service: computer_service,
                toc: computer_toc,
              }}
              onConfirm={() =>
                navigation.navigate('confirm', {name: service[0]})
              }
              title="Web Development"
              img={require('../assets/services/web.png')}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  qrcode: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // justifyContent: 'space-between',
    height: 160,
    backgroundColor: theme.primary_1,
    elevation: 5,
    paddingHorizontal: 30,
  },
  basic: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Home;
