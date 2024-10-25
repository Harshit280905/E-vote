import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsScreen = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        const storedCandidates = await AsyncStorage.getItem('candidates');
        if (storedCandidates) {
          setNewsData(JSON.parse(storedCandidates));
        }
      } catch (error) {
        console.log('Error loading news data:', error);
      }
    };
    loadNewsData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {newsData.map((newsItem, index) => (
        <View key={index} style={styles.newsItem}>
          <Text style={styles.newsTitle}>{newsItem.party} - {newsItem.name}</Text>
          <Text>{newsItem.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  newsItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default NewsScreen;
