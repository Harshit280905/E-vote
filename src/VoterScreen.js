import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import * as Permissions from 'expo-permissions'; // Import Permissions from expo-permissions
import { Camera } from 'expo-camera'; // Import Camera from expo-camera

const VoterScreen = () => {
  const navigation = useNavigation(); 
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (aadhaarNumber.length === 12) {
      Alert.alert('OTP Sent', 'An OTP has been sent to your registered mobile number.');
      setIsOtpSent(true);
    } else {
      Alert.alert('Invalid Aadhaar Number', 'Please enter a valid 12-digit Aadhaar number.');
    }
  };

  const handleLogin = async () => {
    if (otp === '123456') { // Hardcoded OTP for demonstration purposes
      Alert.alert('Login Successful', 'Welcome Voter!');

      // Request camera permissions
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        // Wait for 5 seconds
        setTimeout(() => {
          navigation.navigate('VoterMainScreen'); // Navigate to VoterMainScreen
        }, 5000);
      } else {
        Alert.alert('Camera Permission Denied', 'Please allow camera access to proceed.');
      }
    } else {
      Alert.alert('Login Failed', 'Invalid OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voter Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Aadhaar Card Number"
        value={aadhaarNumber}
        onChangeText={setAadhaarNumber}
        keyboardType="numeric"
        maxLength={12}
      />
      {isOtpSent && (
        <TextInput
          style={styles.input}
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          maxLength={6}
        />
      )}
      <Button 
        title={isOtpSent ? "Login" : "Send OTP"} 
        onPress={isOtpSent ? handleLogin : handleSendOtp} 
        color="#2B6CB0" // Custom blue color for button
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6', // Light gray background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B6CB0', // Custom blue color
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#2B6CB0', // Custom blue border
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFF', // White background for inputs
  },
});

export default VoterScreen;
