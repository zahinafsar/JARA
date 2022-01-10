import * as React from 'react';
import Home from './screens/home';

import Computer from './screens/services/page/computer';
import Laptop from './screens/services/page/laptop';
import CCTV from './screens/services/page/cctv';
import Printer from './screens/services/page/printer';
import Network from './screens/services/page/network';
import Web from './screens/services/page/web';
import Confirm from './screens/confirm';

import Call from './screens/call';
import Chat from './screens/chat';
import Profile from './screens/profile';
import Login from './screens/login';
import Contacts from './screens/contacts';

import Membership from './screens/plans/membership.tsx';
import MonthlyService from './screens/plans/monthlyService';
import TermsForMember from './screens/plans/termForMember';
import TermsForMonthly from './screens/plans/termForMonthly';
// import ConfirmPlan from './screens/plans/confirmPlan';

import {Context} from './store';
import {service} from './repository';
import {theme} from './theme';

const Stack = createStackNavigator();
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import History from './screens/history';

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
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="history"
          component={state.uid ? History : Login}
          options={{
            headerShown: state.uid ? true : false,
            title: 'History',
          }}
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
          name="computer"
          component={Computer}
          options={{
            title: service[0],
          }}
        />
        <Stack.Screen
          name="laptop"
          component={Laptop}
          options={{
            title: service[1],
          }}
        />
        <Stack.Screen
          name="printer"
          component={Printer}
          options={{
            title: service[2],
          }}
        />
        <Stack.Screen
          name="cctv"
          component={CCTV}
          options={{
            title: service[3],
          }}
        />
        <Stack.Screen
          name="network"
          component={Network}
          options={{
            title: service[4],
          }}
        />
        <Stack.Screen
          name="web"
          component={Web}
          options={{
            title: service[5],
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
        {/* <Stack.Screen
          name="confirmPlan"
          component={ConfirmPlan}
          options={{
            title: 'Plan Confirmation',
          }}
        /> */}
        {/* <Stack.Screen
          name="procced"
          component={Procced}
          options={{
            title: 'Confirmation',
          }}
        /> */}
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
        {/* <Stack.Screen
          name="terms"
          component={TermsOfUse}
          options={{
            title: 'Terms and Conditions',
          }}
        /> */}
        <Stack.Screen name="contacts" component={Contacts} />
        <Stack.Screen
          name="profile"
          component={state.uid ? Profile : Login}
          options={{
            headerShown: state.uid ? true : false,
          }}
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
