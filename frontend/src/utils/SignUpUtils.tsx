import { Router } from 'expo-router';
import { callApi } from './api/apiManager';


export const signUpUser = async (
  email: string, 
  password: string,
  router: Router
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
    router.replace('/login') // Navigate to login on success
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