import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../src/redux/Store';
import { updateForm } from '../../src/redux/actions/userFormActions';
import { useFocusEffect } from '@react-navigation/native';
import CustomCard from '../../src/components/textInput';
import CustomButton from '../../src/components/defaultButton';
import { defaultStyles } from '../../src/constants/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';

const LoginPage: React.FC = () => {

    const router = useRouter()

    const dispatch = useDispatch<AppDispatch>();
    const formData = useSelector((state: RootState) => state.form);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(formData.email || '');
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
        setEmail(formData.email);
        setPassword('');
        }, [formData.email])
    );

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
        dispatch(updateForm({ email: newEmail }));
    };

    const handleNewUserPress = () => {
        router.replace('/signup')
    };

    // Handle user login
    const handleLoginPress = async () => {
        setLoading(true)

        if (!email || !password) {
            Alert.alert('Error', 'Please fill out both email and password fields.');
            setLoading(false)
            return;
        }
        
        try {
            await signInWithEmailAndPassword(FIREBASE_AUTH ,email, password)
        } catch (e: any) {
            const err = e as FirebaseError;

            if (err.message.includes('auth/invalid-credential')) {
                alert('Invalid Credentials')
            } else {
                alert('Sign in failed: ' + err.message);
            }
            
        } finally {
            setLoading(false)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <View style={styles.form}>
            <CustomCard
            title="Work Email"
            primaryValue={email}
            onPrimaryChange={handleEmailChange}
            primaryPlaceholder="Enter work email"
            />
            <CustomCard
            title="Password"
            primaryValue={password}
            onPrimaryChange={setPassword}
            primaryPlaceholder="Enter password"
            secureTextEntry={true}
            showSecureTextEntryToggle={true}
            />
            <TouchableOpacity onPress={() => sendPasswordResetEmail(FIREBASE_AUTH ,email)} style={styles.newUserContainer}>
                <Text style={styles.newUserText}>Reset Password</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.bottomView}>
            { loading ? <ActivityIndicator/> : 
                <>
                    <CustomButton title="Log in" onPress={handleLoginPress} />
                    <TouchableOpacity onPress={handleNewUserPress} style={styles.newUserContainer}>
                        <Text style={styles.newUserText}>New User? Sign up</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    title: {
        color: defaultStyles.primaryColor,
        fontSize: 40,
        marginBottom: '10%',
        fontFamily: defaultStyles.fontFamily,
        fontWeight: '800',
        textAlign: 'center',
    },
    form: {
        flex: 1,
        width: '100%',
    },
    bottomView: {
        marginTop: 20,
        width: '100%',
    },
    newUserContainer: {
        marginTop: 10,
        alignSelf: 'center',
    },
    newUserText: {
        color: '#00A3FF',
        fontSize: 13,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    });

    export default LoginPage;