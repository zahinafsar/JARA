import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Plan from './plan';
import Order from './order';
import AppBar from '../../components/header';
import {theme} from '../../theme';

const Tab = createMaterialTopTabNavigator();

function History() {
  return (
    <>
      <AppBar />
      <Tab.Navigator
        tabBarOptions={{
          indicatorStyle: {
            backgroundColor: theme.primary_1,
          },
        }}>
        <Tab.Screen name="Plan" component={Plan} />
        <Tab.Screen name="Order" component={Order} />
      </Tab.Navigator>
    </>
  );
}

export default History;
