import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../src/redux/Store';
import { updateForm } from '../src/redux/actions/userFormActions';
import CustomCard from '../src/components/textInput';
import CustomButton from '../src/components/defaultButton';
import { defaultStyles } from '../src/constants/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PasswordValidator, EmailValidator } from '../src/utils/inputChecks/validators';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { FirebaseError } from '@firebase/app';

const SignUpPage: React.FC = () => {

    const router = useRouter()

    const dispatch = useDispatch<AppDispatch>();
    const formData = useSelector((state: RootState) => state.form);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(formData.email || '');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // State for error messages
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Effect to handle component mount or email change
    useEffect(() => {
        setEmail(formData.email); // Update the email based on Redux state
    }, [formData.email]);

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
        dispatch(updateForm({ email: newEmail }));
        setEmailError(''); // Clear error when user starts typing
    };

    const handleSignUpPress = async () => {
        let valid = true;
        setLoading(true)
    
        // Clear previous error messages
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
    
        // Validate email
        if (!email) {
        setEmailError('Email is required.');
        valid = false;
        } else if (!EmailValidator(email)) {
        setEmailError('Please enter a valid email.');
        valid = false;
        }
    
        // Validate password
        const passwordErrors = PasswordValidator(password, { minLength: 6 });
        if (passwordErrors.length > 0) {
        setPasswordError(passwordErrors.join(' '));
        valid = false;
        }
    
        // Validate confirm password
        if (!confirmPassword) {
        setConfirmPasswordError('Confirm password is required.');
        valid = false;
        } else if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match.');
        valid = false;
        }
    
        if (!valid) {
            setLoading(false)
            return
        };

        try {
            await auth().createUserWithEmailAndPassword(email, password)
        } catch (e: any) {
            const err = e as FirebaseError;
            alert('Registration failed: ' + err.message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.form}>
            <CustomCard
                title="Work Email"
                primaryValue={email}
                onPrimaryChange={handleEmailChange}
                primaryPlaceholder="Enter work email"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <CustomCard
                title="Password"
                primaryValue={password}
                onPrimaryChange={setPassword}
                primaryPlaceholder='Enter password'
                secureTextEntry={true}
                showSecureTextEntryToggle={true}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <CustomCard
                title="Confirm Password"
                primaryValue={confirmPassword}
                onPrimaryChange={setConfirmPassword}
                primaryPlaceholder='Confirm password'
                secureTextEntry={true}
                showSecureTextEntryToggle={true}
            />
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
            </View>
            <View style={styles.bottomView}>
            <CustomButton title='Create Account' onPress={handleSignUpPress} />
            <TouchableOpacity onPress={() => router.replace('/')} style={styles.existingUserContainer}>
                <Text style={styles.existingUserText}>Already have an account? Log in</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start', // Ensure content starts at the top
    },
    title: {
        color: defaultStyles.primaryColor,
        fontSize: 40,
        marginBottom: '10%',
        fontFamily: defaultStyles.fontFamily,
        fontWeight: '800', // Extra Bold
        textAlign: 'center',
    },
    form: {
        flex: 1,
        width: '100%',
    },
    bottomView: {
        marginTop: 20, // Adds space between form and button
        width: '100%',
    },
    existingUserContainer: {
        marginTop: 10,
        alignSelf: 'center'
    },
    existingUserText: {
        color: '#00A3FF',
        fontSize: 13,
        fontWeight: 'bold',
        textDecorationLine: 'underline', // Makes the text look like a link
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginVertical: 5,
        marginHorizontal: 10,
    },
});

export default SignUpPage;