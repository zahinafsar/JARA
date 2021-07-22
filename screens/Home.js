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
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ContactButtons from '../components/contactButtons';
import {theme} from '../theme';
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
    {
      title: 'Item 2',
      text: 'Text 2',
    },
    {
      title: 'Item 3',
      text: 'Text 3',
    },
    {
      title: 'Item 4',
      text: 'Text 4',
    },
    {
      title: 'Item 5',
      text: 'Text 5',
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
          height: 150,
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
        }}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: 'https://onlinedegrees.mtu.edu/sites/default/files/styles/blogfeature_large/public/field/image/MTU_MSASMay.jpg?itok=DVapSpim',
          }}
        />
      </View>
    );
  };

  const ServiceCard = ({title, img, onClick}) => {
    return (
      <TouchableOpacity onPress={onClick}>
        <Card style={styles.card}>
          <View style={styles.imgWrapper}>
            <Image style={styles.img} source={img} />
          </View>
          <Text style={styles.CardText}>{title}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Layout style={styles.container} level="1">
        <TopNavigation
          style={{backgroundColor: theme.color_green}}
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
        <Button style={styles.button} status="info">
          <View>
            <Text style={{color: 'white', fontSize: 13.4}}>
              Membership <ArrowIcon /> (১০০০ টাকায় ১ বছরের Home Service)
            </Text>
          </View>
        </Button>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
    </>
  );
};

const styles = StyleSheet.create({
  socialBtn: {
    margin: 10,
  },
  card: {
    margin: 5,
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
    color: 'white',
  },
});

export default Home;
