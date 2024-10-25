// src/SelectionScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SelectionScreen = ({ navigation }) => {
  const handleRoleSelection = (role) => {
    navigation.navigate(role);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
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
    </LinearGradient>
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
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  adminButton: {
    backgroundColor: '#007bff',
  },
  voterButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectionScreen;
