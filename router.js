import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Chat from './screens/chat';
import Computer from './screens/services/page/computer';
import Laptop from './screens/services/page/laptop';
import CCTV from './screens/services/page/cctv';
import Printer from './screens/services/page/printer';
import Network from './screens/services/page/network';
import Web from './screens/services/page/web';
import Procced from './screens/services/procced';
import {theme} from './theme';
const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.color_green,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="chat"
          component={Chat}
          options={{
            title: 'Live Chat',
          }}
        />
        <Stack.Screen
          name="computer"
          component={Computer}
          options={{
            title: 'Computer Service',
          }}
        />
        <Stack.Screen
          name="printer"
          component={Printer}
          options={{
            title: 'Printer Service',
          }}
        />
        <Stack.Screen
          name="cctv"
          component={CCTV}
          options={{
            title: 'CCTV Setup',
          }}
        />
        <Stack.Screen
          name="laptop"
          component={Laptop}
          options={{
            title: 'Laptop Service',
          }}
        />
        <Stack.Screen
          name="network"
          component={Network}
          options={{
            title: 'Network Setup',
          }}
        />
        <Stack.Screen
          name="web"
          component={Web}
          options={{
            title: 'Web Development',
          }}
        />
        <Stack.Screen
          name="procced"
          component={Procced}
          options={{
            title: 'Confirmation',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
