import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import LoginPage from '../screens/LoginPage';
import SignUpPage from '../screens/SignUpPage';
import HomePage from '../screens/HomePage';
// import SubmitFormPage from '../../../oldFiles/SubmitFormPage';

export type RootStackParamList = {
  LoginPage: undefined;
  SignUpPage: undefined;
  HomePage: undefined;
  // SubmitFormPage: undefined;
};

export type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPage'>;
export type SignUpPageNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpPage'>;
export type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;
// export type SubmitFormPageNavigationProp = StackNavigationProp<RootStackParamList, 'SubmitFormPage'>;

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;