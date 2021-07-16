import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Chat from './screens/chat';
import Computer from './screens/services/coputer';

const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#026d37ed',
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
        <Stack.Screen name="Computer" component={Computer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
