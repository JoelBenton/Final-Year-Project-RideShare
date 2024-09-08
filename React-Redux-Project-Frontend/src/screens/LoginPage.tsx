import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/Store';
import { updateForm } from '../redux/actions/userFormActions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomCard from '../components/textInput';
import CustomButton from '../components/defaultButton';
import { defaultStyles } from '../constants/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LoginUser } from '../utils/LogInUtils';

const LoginPage: React.FC = () => {
  type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPage'>;

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<LoginPageNavigationProp>();
  const formData = useSelector((state: RootState) => state.form);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(formData.email || '');

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
    navigation.navigate('SignUpPage');
  };

  // Handle user login
  const handleLoginPress = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out both email and password fields.');
      return;
    }
    LoginUser(email, password, navigation)
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
      </View>
      <View style={styles.bottomView}>
        <CustomButton title="Log in" onPress={handleLoginPress} />
        <TouchableOpacity onPress={handleNewUserPress} style={styles.newUserContainer}>
          <Text style={styles.newUserText}>New User? Sign up</Text>
        </TouchableOpacity>
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