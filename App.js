// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectionScreen from './src/SelectionScreen';
import AdminScreen from './src/AdminScreen';
import VoterScreen from './src/VoterScreen';
import VoterMainScreen from './src/VoterMainScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Selection">
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="VoterScreen" component={VoterScreen} />
        <Stack.Screen name="VoterMainScreen" component={VoterMainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
