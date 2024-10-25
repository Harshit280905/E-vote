import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [candidateName, setCandidateName] = useState('');
  const [partyName, setPartyName] = useState('');
  const [partyDescription, setPartyDescription] = useState('');
  const [candidates, setCandidates] = useState([]);

  // Load candidates from AsyncStorage when the component mounts
  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const storedCandidates = await AsyncStorage.getItem('candidates');
        if (storedCandidates) {
          setCandidates(JSON.parse(storedCandidates)); // Parse the JSON string into an array
        }
      } catch (error) {
        console.log('Error loading candidates:', error);
      }
    };
    loadCandidates();
  }, []);

  // Handle Admin Login
  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
      Alert.alert('Login Successful', 'Welcome Admin!');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  // Save candidate data
  const handleSaveCandidate = async () => {
    if (candidateName && partyName && partyDescription) {
      const newCandidate = {
        name: candidateName,
        party: partyName,
        description: partyDescription,
      };

      const updatedCandidates = [...candidates, newCandidate];
      setCandidates(updatedCandidates); // Update state

      try {
        await AsyncStorage.setItem('candidates', JSON.stringify(updatedCandidates)); // Save to AsyncStorage
        Alert.alert('Success', 'Candidate saved successfully!');
        // Clear the form fields after saving
        setCandidateName('');
        setPartyName('');
        setPartyDescription('');
      } catch (error) {
        console.log('Error saving candidate:', error);
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  // Handle candidate deletion
  const handleDeleteCandidate = async (index) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates); // Update state

    try {
      await AsyncStorage.setItem('candidates', JSON.stringify(updatedCandidates)); // Save updated list to AsyncStorage
      Alert.alert('Success', 'Candidate deleted successfully!');
    } catch (error) {
      console.log('Error deleting candidate:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Admin Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true} // Hide password input
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Save Candidate Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Candidate Name"
        value={candidateName}
        onChangeText={setCandidateName}
      />
      <TextInput
        style={styles.input}
        placeholder="Party Name"
        value={partyName}
        onChangeText={setPartyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Party Description"
        value={partyDescription}
        onChangeText={setPartyDescription}
      />
      <Button title="Save Candidate" onPress={handleSaveCandidate} />

      <Text style={styles.title}>Saved Candidates</Text>
      <FlatList
        data={candidates}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.candidateItem}>
            <Text style={styles.candidateText}>Name: {item.name}</Text>
            <Text style={styles.candidateText}>Party: {item.party}</Text>
            <Text style={styles.candidateText}>Description: {item.description}</Text>
            <Button title="Delete" onPress={() => handleDeleteCandidate(index)} />
          </View>
        )}
      />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  candidateItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  candidateText: {
    fontSize: 16,
  },
});

export default AdminScreen;
