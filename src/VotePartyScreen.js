import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VotePartyScreen = () => {
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

  const handleVote = (partyName) => {
    Alert.alert('Vote Recorded', `You voted for ${partyName}`);
    // You can add logic here to record the vote and save it in AsyncStorage or send it to a server
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={candidates}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.candidateItem}>
            <Text style={styles.candidateText}>{item.party} - {item.name}</Text>
            <Button title="Vote" onPress={() => handleVote(item.party)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  candidateItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  candidateText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default VotePartyScreen;
