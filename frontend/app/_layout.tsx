import store from '../src/redux/Store';
import { Provider } from "react-redux";
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const InitialLayout = () => {
  const { user, initialized } = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!initialized) return;

    const inTabsGroup = segments[0] === '(tabs)';

    if (user && !inTabsGroup) {
      router.replace('/home');
    } else if (!user) {
      router.replace('/(auth)/login');
    }
  }, [user, initialized]);

  return <>{initialized ? <Slot /> : <ActivityIndicator size='large' />}</>;
};

const RootLayout = () => {
  return (
    <Provider store={store}>
        <AuthProvider>
            <InitialLayout />
        </AuthProvider>
    </Provider>
    
  );
};

export default RootLayout;