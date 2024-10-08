import * as SecureStore from 'expo-secure-store';

const keys = [
  "accessToken",
  "userId"
]


export const saveToken = async (key: string, value: string) => {
  console.log(value)
  await SecureStore.setItemAsync(key, value);
};

export const getToken = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

export const deleteToken = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export const clearSecureStore = async () => {
  try {
    // Delete each key
    for (const key of keys) {
      await SecureStore.deleteItemAsync(key);
    }
    console.log('SecureStore has been cleared.');
  } catch (error) {
    console.error('Error clearing SecureStore:', error);
  }
};