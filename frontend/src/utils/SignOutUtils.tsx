import { callApi } from './api/apiManager';
import { Alert } from 'react-native';
import { clearSecureStore, getToken } from './auth/AuthStorage';
import { Router } from 'expo-router';

interface ApiResponse {
    message?: string;
  }

export const SignOutUser = async (
    router: Router,
  ) => {

    const accessToken = await getToken('accessToken')

    try {
        // Call API to login
        const response = await callApi<ApiResponse>('user/logout', {
          method: 'POST',
          body: JSON.stringify({
            accessToken: accessToken
          }),
        });

        router.replace('/login')
        clearSecureStore();
  
        Alert.alert('Success', 'Logout Successful');
      } catch (error) {
        console.error('Logout error:', error);
        Alert.alert('Error', error instanceof Error ? error.message : 'Login failed.');
      }
}