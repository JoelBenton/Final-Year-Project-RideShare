import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/Store';
import AppNavigator from './src/navigation/AppNavigator';
import { checkTokenValidity } from './src/utils/auth/Auth'; // Import the token checking function
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const App: React.FC = () => {
  // Initialize isLoggedIn to false
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state

  useEffect(() => {
    const verifyTokens = async () => {
      try {
        // Set loading to true while checking tokens
        setLoading(true);
        const valid = await checkTokenValidity();
        setIsLoggedIn(valid);
      } catch (error) {
        console.error('Error verifying tokens:', error);
        setIsLoggedIn(false); // Consider the user not logged in if there's an error
      } finally {
        // Set loading to false after token check is complete
        setLoading(false);
      }
    };

    verifyTokens();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#6A0DAD" />
      </View>
    )
  }

  return (
    <Provider store={store}>
      <AppNavigator isLoggedIn={isLoggedIn} />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});