import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        const storedCandidates = await AsyncStorage.getItem('candidates');
        if (storedCandidates) {
          setNewsData(JSON.parse(storedCandidates));
        }
      } catch (error) {
        console.log('Error loading news data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadNewsData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {newsData.map((newsItem, index) => (
        <View key={index} style={styles.newsItem}>
          <Text style={styles.newsTitle}>{newsItem.party} - {newsItem.name}</Text>
          <Text style={styles.newsDescription}>{newsItem.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 16,
    color: '#666',
  },
});

export default NewsScreen;
