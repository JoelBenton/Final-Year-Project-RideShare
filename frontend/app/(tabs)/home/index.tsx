import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getToken } from '../../../src/utils/auth/AuthStorage';
import { SignOutUser } from '../../../src/utils/SignOutUtils';
import { useRouter } from 'expo-router';

const HomePage: React.FC = () => {

  const router = useRouter()

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setAccessToken(await getToken('accessToken'));
        setUserInfo(await getToken('userId'));
      } catch (error) {
        console.error('Failed to fetch tokens:', error);
      }
    };

    fetchTokens();
  }, []);

  const HandleSignOutPress = () => {
    SignOutUser(router);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome. You have logged in successfully.</Text>
      <Text style={styles.tokenText}>Access Token: {accessToken}</Text>
      <Text style={styles.tokenText}>User Info: {userInfo}</Text>
      <TouchableOpacity onPress={HandleSignOutPress}>
          <Text style={styles.newUserText}>Sign Out?</Text>
        </TouchableOpacity>
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