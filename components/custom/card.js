/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Card} from '@ui-kitten/components';
import {View, Image, StyleSheet} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {theme} from '../../theme';

function MyCard({onPress, title, subtitle, image, style}) {
  return (
    <Ripple style={style} onPress={onPress}>
      <Card style={styles.card}>
        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginBottom: 5,
              color: theme.light_text,
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              opacity: 0.9,
              color: theme.light_text,
            }}>
            {subtitle}
          </Text>
        </View>
        <Image style={styles.image} source={image} />
      </Card>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    right: 10,
    width: 90,
    height: 90,
  },
});

export default MyCard;
