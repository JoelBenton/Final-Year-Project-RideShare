import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomePage: React.FC = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome. You have logged in successfully.</Text>
      <Text style={styles.tokenText}>User Info: {FIREBASE_AUTH.currentUser.uid}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tokenText: {
    fontSize: 16,
    marginBottom: 10,
  },
  newUserText: {
    color: '#00A3FF',
    fontSize: 13,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default HomePage;