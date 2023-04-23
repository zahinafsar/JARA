import React from 'react';
import AppBar from '../components/header';
import {ScrollView, Text, View} from 'react-native';
import Ripple from 'react-native-material-ripple';
import Icon from '../components/icon';
import {Context} from '../store';

const Option = ({title, onPress, icon = 'chevron-right-outline'}) => {
  return (
    <Ripple
      onPress={onPress}
      style={{
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      }}>
      <Text style={{fontWeight: 'bold'}}>{title}</Text>
      <Icon name={icon} />
    </Ripple>
  );
};

function Settings({navigation}) {
  const [state, setState] = React.useContext(Context);
  async function logout() {
    setState({...state, uid: ''});
    navigation.navigate('Home');
  }

  return (
    <>
      <AppBar />
      <ScrollView>
        <View style={{flex: 1, marginTop: 10}}>
          <Option
            title="Edit Profile"
            onPress={() => {
              navigation.navigate('editProfile');
            }}
          />
          <Option title="Logout" onPress={logout} />
        </View>
      </ScrollView>
    </>
  );
}

export default Settings;
