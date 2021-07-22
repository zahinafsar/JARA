import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  Layout,
  Text,
  ViewPager,
  Button,
  Icon,
  CheckBox,
} from '@ui-kitten/components';
import TermsOfUse from './termOfUse';
import AppointUs from './appointUs';

const leftIcon = props => <Icon {...props} name="arrow-left-outline" />;
const rightIcon = props => <Icon {...props} name="arrow-right-outline" />;

function Procced({navigation}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Layout style={{...styles.tab, padding: 20}} level="2">
          <TermsOfUse />
          <CheckBox
            style={{marginTop: 15}}
            checked={checked}
            onChange={nextChecked => setChecked(nextChecked)}>
            I have read the terms and conditions
          </CheckBox>
        </Layout>
        <Layout style={styles.tab} level="2">
          <AppointUs navigation={navigation} />
        </Layout>
      </ViewPager>
      {selectedIndex ? (
        <Button
          onPress={() => setSelectedIndex(selectedIndex - 1)}
          size="small"
          style={{...styles.button, left: 20}}
          status="warning"
          accessoryLeft={leftIcon}>
          Back
        </Button>
      ) : (
        <></>
      )}
      {selectedIndex === 0 ? (
        <Button
          onPress={() => setSelectedIndex(selectedIndex + 1)}
          disabled={selectedIndex === 0 && !checked}
          size="small"
          style={{...styles.button, right: 20}}
          status="info"
          accessoryRight={rightIcon}>
          Next
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 30,
  },
});

export default Procced;
