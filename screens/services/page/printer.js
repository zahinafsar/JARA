import React from 'react';
import {View, Text, Image} from 'react-native';

function Printer(props) {
  return (
    <View>
      <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
        <Image source={require('../../../assets/services/page/printer.png')} />
      </View>
    </View>
  );
}

export default Printer;
