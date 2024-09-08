import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { callApi } from './api/apiManager';
import { Alert } from 'react-native';

type LogInPageNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPage'>;

export const LoginUser = async (
    email: string, 
    password: string,
    navigation: LogInPageNavigationProp
  ) => {

    try {
        // Call API to login
        const response = await callApi<{ message?: string }>('user/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
        });
  
        // Handle response
        if (response.message === 'Login Successful') {
          Alert.alert('Success', 'Login successful!');
          // Navigate to another page after successful login
          navigation.navigate('HomePage'); // Or any other page you want to navigate to
        } else {
          Alert.alert('Login Failed', response.message || 'Login failed.');
        }
      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Error', error instanceof Error ? error.message : 'Login failed.');
      }
}