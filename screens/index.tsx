import React from 'react';
import {Icon} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './home';
import Settings from './settings';
import History from './history';
import Chat from './chat';
import {Context} from '../store';
import Login from './login';
import {theme} from '../theme';

const Tab = createBottomTabNavigator();

function BottomNav({}) {
  const [state] = React.useContext(Context);
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'keypad-outline';
            } else if (route.name === 'History') {
              iconName = 'shopping-bag-outline';
            } else if (route.name === 'Settings') {
              iconName = 'settings-outline';
            } else if (route.name === 'Support') {
              iconName = 'message-circle-outline';
            }
            return (
              <Icon
                name={iconName}
                style={{height: size, width: size}}
                fill={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: theme.primary_1,
          tabStyle: {
            padding: 10,
          },
          style: {
            height: 60,
          },
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen
          name="Support"
          options={{
            tabBarVisible: false,
          }}
          component={!state.uid ? Login : Chat}
        />
        <Tab.Screen
          name="History"
          options={
            state.uid
              ? {}
              : {
                  tabBarVisible: false,
                }
          }
          component={!state.uid ? Login : History}
        />
        <Tab.Screen
          name="Settings"
          options={
            state.uid
              ? {}
              : {
                  tabBarVisible: false,
                }
          }
          component={!state.uid ? Login : Settings}
        />
      </Tab.Navigator>
    </>
  );
}

export default BottomNav;
