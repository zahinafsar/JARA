import * as React from 'react';
import BottomNav from './screens';

import Call from './screens/call';
import Chat from './screens/chat';
import Order from './screens/history';
import Login from './screens/login';
import Contacts from './screens/contacts';

import Membership from './screens/plans/membership.tsx';
import MonthlyService from './screens/plans/monthlyService';
import TermsForMember from './screens/plans/termForMember';
import TermsForMonthly from './screens/plans/termForMonthly';

import {Context} from './store';
import {service} from './repository';
import {theme} from './theme';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ViewImage from './screens/viewImage';
import Confirm from './screens/confirm';
import EditProfile from './screens/editProfile';
const Stack = createStackNavigator();

function Router() {
  const [state] = React.useContext(Context);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: theme.light_text,
          headerTitleStyle: {
            fontWeight: '100',
          },
        }}>
        <Stack.Screen
          name="Main"
          component={BottomNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="chat"
          component={state.uid ? Chat : Login}
          options={{
            headerShown: state.uid ? true : false,
            title: 'Live Chat',
          }}
        />
        <Stack.Screen
          name="membership"
          component={Membership}
          options={{
            title: 'Membership Plan',
          }}
        />
        <Stack.Screen
          name="monthly"
          component={MonthlyService}
          options={{
            title: 'Monthly Service',
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="confirm"
          component={state.uid ? Confirm : Login}
          options={{
            headerShown: state.uid ? true : false,
            title: 'Confirmation',
          }}
        />
        <Stack.Screen
          name="termsMember"
          component={TermsForMember}
          options={{
            title: 'Terms and Conditions',
          }}
        />
        <Stack.Screen
          name="termsMonthly"
          component={TermsForMonthly}
          options={{
            title: 'Terms and Conditions',
          }}
        />
        <Stack.Screen name="contacts" component={Contacts} />
        <Stack.Screen
          name="editProfile"
          component={state.uid ? EditProfile : Login}
          options={{
            title: 'Edit Profile',
            headerShown: true,
          }}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="viewImage"
          component={ViewImage}
        />
        <Stack.Screen
          name="call"
          component={state.uid ? Call : Login}
          options={{
            headerShown: state.uid ? true : false,
            title: 'Admin',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
