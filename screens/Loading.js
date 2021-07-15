/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';

function Loading() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{width: 130, height: 130}}
        source={require('../assets/load.png')}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'green',
          position: 'absolute',
          bottom: 40,
        }}>
        JARA
      </Text>
    </View>
  );
}

export default Loading;
