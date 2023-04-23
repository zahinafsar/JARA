import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Button} from '@ui-kitten/components';

interface TermsForMemberProps {
  terms: string[];
  next: () => void;
  title: string;
}

function TOC({terms, next, title}: TermsForMemberProps) {
  return (
    <View>
      <ScrollView>
        <View
          style={{
            padding: 5,
            margin: 5,
            marginBottom: 55,
          }}>
          <View style={{backgroundColor: 'white', padding: 15}}>
            <Text style={{marginBottom: 5, fontWeight: 'bold'}}>{title}</Text>
            <View>
              {terms.map((a, i) => (
                <Text key={i} style={{marginVertical: 5}}>{`${
                  i + 1
                })  ${a}`}</Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <Button onPress={next} status="warning" style={styles.btn}>
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    // borderRadius: 0,
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default TOC;
