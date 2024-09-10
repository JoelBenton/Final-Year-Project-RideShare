import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import LoginPage from '../screens/LoginPage';
import SignUpPage from '../screens/SignUpPage';
import HomePage from '../screens/HomePage';

export type RootStackParamList = {
  LoginPage: undefined;
  SignUpPage: undefined;
  HomePage: undefined;
};

export type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPage'>;
export type SignUpPageNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpPage'>;
export type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

const Stack = createStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  isLoggedIn: boolean;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ isLoggedIn }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "HomePage" : "LoginPage"}>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{ headerShown: false }}
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