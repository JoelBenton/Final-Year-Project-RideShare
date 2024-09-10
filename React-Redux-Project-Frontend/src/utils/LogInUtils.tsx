import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { callApi } from './api/apiManager';
import { Alert } from 'react-native';
import { saveToken, deleteToken } from './auth/AuthStorage';

type LogInPageNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPage'>;

interface ApiResponse {
    message?: string;
    accessToken: string;
    refreshToken: string;
    userId: string;
  }

export const LoginUser = async (
    email: string, 
    password: string,
    navigation: LogInPageNavigationProp
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
        await saveToken('refreshToken', response.refreshToken)
        await saveToken('userId', response.userId)

        // Navigate to another page after successful login
        navigation.navigate('HomePage'); // Or any other page you want to navigate to
      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Error', error instanceof Error ? error.message : 'Login failed.');
      }
}