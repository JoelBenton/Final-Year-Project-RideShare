import * as SecureStore from 'expo-secure-store';

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