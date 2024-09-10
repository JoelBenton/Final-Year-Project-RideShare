import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { callApi } from './api/apiManager';
import { Alert } from 'react-native';
import { getToken } from './auth/AuthStorage';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

interface ApiResponse {
    message?: string;
  }

export const SignOutUser = async (
    navigation: HomePageNavigationProp
  ) => {

    const refreshToken = await getToken('refreshToken')

    try {
        // Call API to login
        const response = await callApi<ApiResponse>('user/logout', {
          method: 'POST',
          body: JSON.stringify({
            refreshToken: refreshToken
          }),
        });

        // Navigate to another page after successful login
        navigation.navigate('LoginPage');
  
        Alert.alert('Success', 'Logout Successful');
      } catch (error) {
        console.error('Logout error:', error);
        Alert.alert('Error', error instanceof Error ? error.message : 'Login failed.');
      }
}