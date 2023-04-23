import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {theme} from '../theme';
import {useNavigation} from '@react-navigation/native';

interface AppBarProps {
  title?: string;
  back?: boolean;
}

const Logo = () => (
  <Image
    style={{width: 55, height: 55}}
    source={require('../assets/logo.png')}
  />
);

const BackIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon
        name="arrow-ios-back-outline"
        style={{width: 30, height: 30}}
        fill="black"
      />
    </TouchableOpacity>
  );
};

function AppBar({title, back}: AppBarProps) {
  return (
    <TopNavigation
      alignment="center"
      title={() => <Text style={styles.headerTitle}>{title || 'JARA'}</Text>}
      accessoryLeft={back ? BackIcon : Logo}
    />
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.light_text,
  },
});

export default AppBar;
