import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [candidateName, setCandidateName] = useState('');
  const [partyName, setPartyName] = useState('');
  const [partyDescription, setPartyDescription] = useState('');
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const storedCandidates = await AsyncStorage.getItem('candidates');
        if (storedCandidates) {
          setCandidates(JSON.parse(storedCandidates));
        }
      } catch (error) {
        console.log('Error loading candidates:', error);
      }
    };
    loadCandidates();
  }, []);

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
      Alert.alert('Login Successful', 'Welcome Admin!');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  const handleSaveCandidate = async () => {
    if (candidateName && partyName && partyDescription) {
      const newCandidate = {
        name: candidateName,
        party: partyName,
        description: partyDescription,
      };

      const updatedCandidates = [...candidates, newCandidate];
      setCandidates(updatedCandidates);

      try {
        await AsyncStorage.setItem('candidates', JSON.stringify(updatedCandidates));
        Alert.alert('Success', 'Candidate saved successfully!');
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

  const handleDeleteCandidate = async (index) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates);

    try {
      await AsyncStorage.setItem('candidates', JSON.stringify(updatedCandidates));
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
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
      <TouchableOpacity style={styles.button} onPress={handleSaveCandidate}>
        <Text style={styles.buttonText}>Save Candidate</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Saved Candidates</Text>
      <FlatList
        data={candidates}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.candidateItem}>
            <Text style={styles.candidateText}>Name: {item.name}</Text>
            <Text style={styles.candidateText}>Party: {item.party}</Text>
            <Text style={styles.candidateText}>Description: {item.description}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteCandidate(index)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  candidateItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  candidateText: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default AdminScreen;
