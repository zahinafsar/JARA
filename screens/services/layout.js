import React from 'react';
import {View, Text, Image} from 'react-native';

function Service(props) {
  const {Page} = props.route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>{Page}</View>
  );
}

export default Service;
