import React, { useState, useEffect } from 'react';
import { checkTokenValidity } from '../src/utils/auth/Auth';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const verifyTokens = async () => {
            try {
                setLoading(true);
                const valid = await checkTokenValidity();
                setIsLoggedIn(valid);
            } catch (error) {
                console.error('Error verifying tokens:', error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        verifyTokens();
    }, []);

    // New useEffect to handle navigation based on login state
    useEffect(() => {
        if (!loading) {
            if (isLoggedIn) {
                router.replace('(tabs)/home');
            } else {
                router.replace('/login');
            }
        }
    }, [isLoggedIn, loading, router]);

    if (loading) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#6A0DAD" />
            </View>
        );
    }

    return null; // Optionally return null or some fallback UI, as navigation will happen
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});