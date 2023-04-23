import React from 'react';
import {StyleSheet} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {Button as UIButton, ButtonProps} from '@ui-kitten/components';

export default function Button({onPress, ...rest}: ButtonProps) {
  return (
    <Ripple onPress={onPress} style={[styles.button]}>
      <UIButton {...rest} />
    </Ripple>
  );
}

const styles = StyleSheet.create({
  button: {},
});
