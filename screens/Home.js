/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  IconRegistry,
  Card,
  Button,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {StyleSheet, View, Image, Dimensions, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ContactButtons from '../components/contactButtons';
import {theme} from '../theme';
import Ripple from 'react-native-material-ripple';
const TestLogo = props => {
  return (
    <Image
      style={{width: 40, height: 40}}
      source={require('../assets/logo.png')}
    />
  );
};

const Home = ({navigation}) => {
  const renderBackAction = () => <TopNavigationAction icon={TestLogo} />;

  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;

  // const getData = async () => {
  //   console.log('Running....');
  // const userDocument = await firestore().collection('chat').get();
  // console.log(userDocument);
  // };

  const carouselItems = [
    {
      title: 'Item 1',
      text: 'Text 1',
    },
  ];

  const ArrowIcon = props => <Icon {...props} name="arrow-circle-right" />;

  const RenderItem = ({item, index}) => {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 5,
          width: '100%',
          height: 200,
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
        }}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/cover.png')}
        />
      </View>
    );
  };

  const ServiceCard = ({title, img, onClick}) => {
    return (
      <View>
        <Ripple style={{margin: 5}} onPress={onClick}>
          <Card style={styles.card}>
            <View style={styles.imgWrapper}>
              <Image style={styles.img} source={img} />
            </View>
            <Text style={styles.CardText}>{title}</Text>
          </Card>
        </Ripple>
      </View>
    );
  };

  return (
    <ScrollView>
      <IconRegistry icons={EvaIconsPack} />
      <Layout style={styles.container} level="1">
        <TopNavigation
          style={{backgroundColor: theme.color_primary}}
          alignment="center"
          title={<Text style={styles.headerTitle}>JARA</Text>}
          accessoryLeft={renderBackAction}
        />
      </Layout>
      <View>
        <Carousel
          layout={'default'}
          // ref={ref => (this.carousel = ref)}
          data={carouselItems}
          sliderWidth={windowWidth - 10}
          itemWidth={windowWidth - 10}
          renderItem={RenderItem}
          onSnapToItem={index => setActiveIndex(index)}
        />
      </View>
      <View style={styles.socialBtn}>
        <Ripple
          onPress={() => {
            navigation.navigate('membership');
          }}>
          <Card
            style={{
              alignItems: 'center',
              backgroundColor: theme.color_primary,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                fontWeight: 'bold',
                marginBottom: 5,
                color: theme.light_text,
              }}>
              Membership
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                opacity: 0.9,
                color: theme.light_text,
              }}>
              ১০০০ টাকায় ১ বছরের Home Service
            </Text>
          </Card>
        </Ripple>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <ServiceCard
            onClick={() => {
              navigation.navigate('computer');
            }}
            title="Computer Service"
            img={require('../assets/services/computer.png')}
          />
          <ServiceCard
            onClick={() => {
              navigation.navigate('laptop');
            }}
            title="Laptop Service"
            img={require('../assets/services/laptop.png')}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <ServiceCard
            onClick={() => {
              navigation.navigate('printer');
            }}
            title="Printer Service"
            img={require('../assets/services/printer.png')}
          />
          <ServiceCard
            onClick={() => {
              navigation.navigate('cctv');
            }}
            title="CCTV Setup"
            img={require('../assets/services/camera.png')}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <ServiceCard
            onClick={() => {
              navigation.navigate('network');
            }}
            title="Network Setup"
            img={require('../assets/services/network.png')}
          />
          <ServiceCard
            onClick={() => {
              navigation.navigate('web');
            }}
            title="Web Development"
            img={require('../assets/services/web.png')}
          />
        </View>
        <ContactButtons navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  socialBtn: {
    margin: 10,
  },
  card: {
    // margin: 5,
    // elevation: 2,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardText: {
    fontSize: 10,
    textAlign: 'center',
  },
  img: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  imgWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    elevation: 10,
  },
  tinyLogo: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.light_text,
  },
});

export default Home;
