import { Stack, useRouter, useSegments } from "expo-router"
import store from '../src/redux/Store';
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ActivityIndicator, View } from "react-native";

export default function StackLayout() {
    const router = useRouter();
    const segments = useSegments();

    const [initialising, setInitialising] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

    const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
        console.log('onAuthStateChanges', user);
        setUser(user);
        if (initialising) setInitialising(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber
    }, []);

    useEffect(() => {
        if (initialising) return;

        const inTabsGroup = segments[0] === '(tabs)';

        if (user && !inTabsGroup) {
            router.replace('/(tabs)/home')
        } else if (!user && inTabsGroup) {
            router.replace('/');
        }

    }, [user, initialising])

    if (initialising) {
        return (
            <View 
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}>
                    <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="(tabs)"  options={{headerShown: false }}/>
                <Stack.Screen name="index"  options={{headerShown: false }}/>
                <Stack.Screen name="signup"  options={{headerShown: false }}/>
            </Stack>
        </Provider>
    )
}