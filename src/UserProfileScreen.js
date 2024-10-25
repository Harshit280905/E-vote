import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Name: Voter User</Text>
      <Text>Aadhaar: 1234-5678-9101</Text>
      <Text>Phone: +91-XXXXXXXXXX</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default UserProfileScreen;
