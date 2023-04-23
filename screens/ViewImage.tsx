import React from 'react';
import {Image, View} from 'react-native';
import {Button, Icon} from '@ui-kitten/components';

const Back = (props: any) => (
  <Icon {...props} width={35} height={35} name="arrow-back-outline" />
);

const ViewImage = ({navigation, route}: any) => (
  <View
    style={{
      position: 'absolute',
      backgroundColor: 'black',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    }}>
    <>
      <Button
        style={{
          position: 'absolute',
          top: 0,
          left: -10,
          zIndex: 1,
        }}
        appearance="ghost"
        status="control"
        size="giant"
        accessoryLeft={Back}
        onPress={() => navigation.goBack()}
      />
      <Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
        }}
        source={{uri: route.params}}
      />
    </>
  </View>
);

export default ViewImage;
