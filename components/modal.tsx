import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNModal from 'react-native-modal';

type Props = {
  children: React.ReactNode;
};

export default function Modal({children}: Props) {
  return (
    <RNModal isVisible={true}>
      <View style={styles.modal}>{children}</View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
