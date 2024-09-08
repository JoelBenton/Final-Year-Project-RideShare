import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { callApi } from './api/apiManager';

type SignUpPageNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpPage'>;

export const signUpUser = async (
  email: string, 
  password: string,
  navigation: SignUpPageNavigationProp
) => {
  try {
    const response = await callApi<{ message: string }>('user/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Handle success
    alert('Sign up successful! You can now log in.');
    navigation.navigate('LoginPage'); // Navigate to login on success
  } catch (error) {
    console.log('Sign up error:', error);

    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      alert(error.message || 'There was a problem with the sign-up process. Please try again.');
    } else {
      alert('There was a problem with the sign-up process. Please try again.');
    }
  }
};