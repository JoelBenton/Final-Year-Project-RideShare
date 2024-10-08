import { callApi } from './api/apiManager';
import { Alert } from 'react-native';
import { saveToken, deleteToken } from './auth/AuthStorage';
import { Router } from 'expo-router';

interface ApiResponse {
    message?: string;
    accessToken: string;
    userId: string;
  }

export const LoginUser = async (
    email: string, 
    password: string,
    router: Router,
  ) => {

    try {
        // Call API to login
        const response = await callApi<ApiResponse>('user/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
        });
  
        Alert.alert('Success', 'Login successful!');

        await saveToken('accessToken', response.accessToken)
        await saveToken('userId', response.userId)

        // Navigate to another page after successful login
        router.replace('(tabs)/home')
      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Error', error instanceof Error ? error.message : 'Login failed.');
      }
}