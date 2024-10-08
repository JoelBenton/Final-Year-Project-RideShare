import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SettingsPage: React.FC = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Settings Page</Text>
    </View>
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
});

export default SettingsPage;