import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {Text, Button, Divider} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

function TermsForMonthly({navigation}) {
  const windowHeight = Dimensions.get('window').height;

  const terms = [
    'Onsite Service.',
    'মাসে যতবার দরকার ততবার।',
    'মাস শেষে যথা সময়ে বিল দিতে  হবে ।',
    'Service শুধুমাত্র Windows Problem, Hang Problem, No Display, Auto restart এর ক্ষেত্রে প্রযোজ্য।',
    'নতুন কোন Software install এর ক্ষেত্রে  Onsite Service প্রযোজ্য নয়।',
    'নতুন কোন Hardware install (Third party থেকে ক্রয় করা) এর ক্ষেত্রে onsite Service প্রযোজ্য নয়',
    'JARA থেকে নেয়া Hardware এর ক্ষেত্রে Service ও delivery ফ্রি',
    'Computer এর সাথে সংযুক্ত  Printer, Scanner, Plotter এ Service এর  আওতায় পড়বে ।',
    'Mother Board Repairing এর ক্ষেত্রে আলাদা সার্ভিস চার্জ দিতে হবে।',
    'Troubleshooting করার পর কোন Parts দরকার হলে JARA  থেকে নিতে পারেন অথবা third party থেকে নিতে পারেন।',
    'JARA র আবেদন থাকবে JARA হতে ক্রয় করেন।',
    '৪ নং সমস্যা ব্যতিত বিনা কারণে call করা যাবে না।`',
  ];
  return (
    <View>
      <ScrollView>
        <View
          style={{
            padding: 5,
            margin: 15,
            marginBottom: 55,
          }}>
          <Text style={{marginBottom: 5, fontWeight: 'bold'}}>
            Service Contract এর কাজের পরিধিঃ
          </Text>
          <View>
            {terms.map((a, i) => (
              <Text key={i} style={{marginVertical: 5}} key={i}>{`${
                i + 1
              })  ${a}`}</Text>
            ))}
          </View>
        </View>
      </ScrollView>
      <Button
        onPress={() => navigation.navigate('confirm')}
        status="warning"
        style={styles.btn}>
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default TermsForMonthly;
