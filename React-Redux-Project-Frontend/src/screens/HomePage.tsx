import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome. You have logged in successfully.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;