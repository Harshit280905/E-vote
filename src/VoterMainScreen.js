// src/VoterMainScreen.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import NewsScreen from './NewsScreen';
import VotePartyScreen from './VotePartyScreen';
import UserProfileScreen from './UserProfileScreen';

const Tab = createBottomTabNavigator();

const VoterMainScreen = () => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarActiveTintColor: '#ffffff',
            tabBarInactiveTintColor: '#cccccc',
          }}
        >
          <Tab.Screen name="Political News" component={NewsScreen} />
          <Tab.Screen name="Vote" component={VotePartyScreen} />
          <Tab.Screen name="Profile" component={UserProfileScreen} />
        </Tab.Navigator>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default VoterMainScreen;
