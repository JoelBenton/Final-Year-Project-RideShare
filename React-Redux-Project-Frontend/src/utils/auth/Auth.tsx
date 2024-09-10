import { getToken } from './AuthStorage';
import { callApi } from '../api/apiManager';

export const checkTokenValidity = async (): Promise<boolean> => {
  try {
    const refreshToken = await getToken('refreshToken');

    console.log(refreshToken)

    if (!refreshToken) {
      return false; // No refresh token means not logged in
    }

    // Make an API call to check if the refresh token is still valid
    await callApi('user/check-refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return true; // Refresh token is valid if no error was thrown
  } catch (err) {
    // Type assertion to ensure `err` is an `Error`
    if (err instanceof Error) {
      console.log('Token validity check error:', err.message);
    } else {
      console.log('Unknown error during token validity check:', err);
    }
    
    return false; // Consider token invalid if an error occurred
  }
};