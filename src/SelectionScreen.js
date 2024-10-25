// src/SelectionScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SelectionScreen = ({ navigation }) => {
  const handleRoleSelection = (role) => {
    navigation.navigate(role);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, styles.adminButton]} 
        onPress={() => handleRoleSelection('AdminScreen')}
      >
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.voterButton]} 
        onPress={() => handleRoleSelection('VoterScreen')}
      >
        <Text style={styles.buttonText}>Voter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    width: 300,  // Width of the button
    height: 60,  // Height of the button
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center',     // Center the text horizontally
    margin: 20,               // Space between buttons
    borderRadius: 5,          // Rounded corners
  },
  adminButton: {
    backgroundColor: '#007bff', // Color for Admin button
  },
  voterButton: {
    backgroundColor: '#28a745', // Color for Voter button
  },
  buttonText: {
    color: '#ffffff',          // Text color
    fontSize: 18,              // Font size
    fontWeight: 'bold',        // Bold text
  },
});

export default SelectionScreen;
