/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {theme} from '../../theme';
import {Button, Icon, Card, Divider, Text} from '@ui-kitten/components';
import ContactButtons from '../../components/contactButtons';

const StarIcon = props => <Icon {...props} name="star" />;
const Arrow = props => <Icon {...props} name="arrow-forward-outline" />;

function MonthlyService({navigation}) {
  const RenderItem = ({data}) => {
    return (
      <View>
        <View style={{flexDirection: 'row', maxWidth: '90%'}}>
          <Icon
            style={{height: 20, width: 20, marginRight: 15}}
            fill="#8F9BB3"
            name="arrow-right-outline"
          />
          <Text>{data}</Text>
        </View>
        <Divider style={{marginVertical: 13}} />
      </View>
    );
  };

  const whyToCall = [
    'অটোরিক্সা বা CNG এর জন্য ঘন্টার পর ঘণ্টা রাস্তায় দাড়িয়ে থাকতে হবে না',
    'কম্পিউটার নিয়ে রাস্তায় বের হওয়ার ভোগান্তিও পোহাতে হবে না',
    'Service সেন্টারে নিতে হবে না',
    'সময় অপচয় হবে না',
    'গাড়ী ভাড়া সাশ্রয় হবে',
    'আপনার ঘরে বসেই Computer সমস্যা সমাধান',
  ];
  const services = [
    'একটি প্রতিষ্ঠানেই পাবেন সব ধরনের আইটি সেবা',
    '20+ বছরের সু-দক্ষ ইঞ্জিনিয়ার দ্বারা পরিচালিত',
    'আমাদের আছে সু-দক্ষ কর্মী ও সর্বাধুনিক প্রযুক্তি',
    'স্বল্প খরচে মাসিক চুক্তি ভিত্তিক পরিপূর্ণ সেবা',
    'সার্বক্ষণিক সকল ইউজারদেরকে মনিটরিং করা',
    'সকল তথ্যের গোপনীয়তা ও সুরক্ষার নিশ্চয়তা',
    '২৪ ঘণ্টা রিমোট সেবা ও ইউজারকে সহায়তা প্রদান',
    'প্রতি মাসে হার্ডওয়্যার চেকআপ ও পরিস্কার রাখা',
    'প্রতি সাপ্তাহে ডাটা ব্যাকআপ এবং OS ক্লিন রাখা',
    'আমাদের সকল সফটওয়্যার সুরক্ষিত ও ভাইরাস মুক্ত',
    'চিপ লেভেল রিপেয়ার ও ডাটা রিকভারি সেবা',
    'ই-মেইল, নেটওয়ার্ক ও ওয়েব সুরক্ষা নিশ্চিত করা',
    'ডোমেইন ও হোস্টিং এর ক্ষেত্রে সম্পূর্ণ প্যানেল প্রদান',
    'সুরক্ষিত ভাবে ওয়েবসাইট ও সফটওয়্যার তৈরি করা',
    'সম্পূর্ণ ফ্রীতে আইটি পরামর্শ প্রদান সহ আরও সুবিধা..',
    'ল্যাপটপ-ডেস্কটপ কম্পিউটার চিপ-লেভেল রিপেয়ার।',
    'মাসিক চুক্তি ভিত্তিক, অফিস / ইন্ডাস্ট্রিতে আইটি সেবা।',
    // 'মাত্র ১০০০ টাকায় হোম / অফিস আইটি সেবা ',
    'ওয়েবসাইট এবং সফটওয়্যার তৈরি ও রক্ষণাবেক্ষণ।',
    'তথ্য ও সেবা সম্পর্কে জানতে ওয়েবসাইট ভিজিট করুন',
  ];
  return (
    <>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 250, height: 250, resizeMode: 'contain'}}
            source={require('../../assets/why.png')}
          />
        </View>
        <Button
          onPress={() => {
            navigation.navigate('termsMonthly');
          }}
          accessoryRight={Arrow}
          status="warning"
          style={{margin: 13, elevation: 5}}>
          Total Office IT Solution(Contract Basis)
        </Button>
        <Button
          style={styles.button}
          status="info"
          accessoryLeft={StarIcon}
          accessoryRight={StarIcon}>
          <Text style={styles.title}>কেন ডাকবেন ?</Text>
        </Button>
        <Card style={{marginHorizontal: 13, paddingTop: 10}}>
          {whyToCall.map((a,i) => (
            <RenderItem key={i} data={a} />
          ))}
        </Card>
        <Button
          style={styles.button}
          status="info"
          accessoryLeft={StarIcon}
          accessoryRight={StarIcon}>
          <Text style={styles.title}>আমাদের সার্ভিস সমুহ</Text>
        </Button>
        <Card style={{marginHorizontal: 13, paddingTop: 10}}>
          {services.map((a,i) => (
            <RenderItem key={i} data={a} />
          ))}
        </Card>
        <ContactButtons navigation={navigation} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    // justifyContent: 'flex-start',
    borderRadius: 40,
    marginTop: 10,
    margin: 13,
    backgroundColor: theme.primary_1,
    color: theme.light_text,
    borderColor: 'white',
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  card: {
    marginHorizontal: 13,
    paddingTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
});
export default MonthlyService;
