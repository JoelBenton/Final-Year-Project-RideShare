import { Platform } from 'react-native';

// Base URL for the API
const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:3000/'  // Use HTTP for Android emulator
  : 'http://localhost:3000/'; // Use HTTP for iOS/Simulator

async function callApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Check if the response status is not OK (status 200-299)
    if (!response.ok) {
      // If not OK, parse the JSON to get the error message
      const errorData = await response.json();
      const error = new Error(errorData.message || 'Something went wrong');
      // Attach the status code and the error response data for handling
      (error as any).response = {
        status: response.status,
        data: errorData,
      };
      throw error;
    }

    // Parse and return the JSON response for success
    return (await response.json()) as T;
  } catch (error) {
    console.log('Error fetching data from API:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export { callApi };