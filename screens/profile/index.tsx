import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ActivePlan from './ActivePlan';
import Settings from './settings';
const Tab = createMaterialTopTabNavigator();

function Profile() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ActivePlan"
        options={{
          title: 'Active Plan',
        }}
        component={ActivePlan}
      />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default Profile;
