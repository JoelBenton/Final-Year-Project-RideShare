import { getToken, saveToken } from './AuthStorage';
import { callApi } from '../api/apiManager';

interface ApiResponse {
  message?: string;
  accessToken: string;
}

export const checkTokenValidity = async (): Promise<boolean> => {
  try {
    const accessToken = await getToken('accessToken');

    if (!accessToken) {
      return false; // No refresh token means not logged in
    }

    // Make an API call to check if the refresh token is still valid
    const result = await callApi<ApiResponse>('user/check-access-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(result)

    saveToken('accessToken', result.accessToken)

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