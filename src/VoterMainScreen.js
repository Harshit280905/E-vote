// src/VoterMainScreen.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsScreen from './NewsScreen';
import VotePartyScreen from './VotePartyScreen';
import UserProfileScreen from './UserProfileScreen';

const Tab = createBottomTabNavigator();

const VoterMainScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Political News" component={NewsScreen} />
      <Tab.Screen name="Vote" component={VotePartyScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

export default VoterMainScreen;
