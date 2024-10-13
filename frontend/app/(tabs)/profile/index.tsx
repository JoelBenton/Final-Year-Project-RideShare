import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../../src/components/defaultButton'
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../config/FirebaseConfig';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'expo-router';


const ProfileScreen = () => {
  const { user  } = useAuth();
  const router = useRouter();

  if (!user) {
    return
  }

  function handleChangePassword() {
    router.push('/profile/changePassword')
  }

  function handleEditProfile() {  
    return;
  }

  const HandleSignOutPress = () => {
    signOut(FIREBASE_AUTH);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.username}>{user.displayName}</Text>
      </View>

      <CustomButton title='Edit Profile' onPress={handleEditProfile} buttonStyle={styles.button} textStyle={styles.buttonText}/>
      <CustomButton title='Change Password' onPress={handleChangePassword} buttonStyle={styles.button} textStyle={styles.buttonText}/>
      <CustomButton title='Ride History' onPress={handleEditProfile} buttonStyle={styles.button} textStyle={styles.buttonText}/>
      <CustomButton title='Log out' onPress={HandleSignOutPress} buttonStyle={styles.button} textStyle={styles.buttonText}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileSection: {
    backgroundColor: '#5e3b75',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D3D3D3',
  },
  username: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold'
  },
  button: {
    width: '85%',
    backgroundColor: '#D3D3D3',
    marginBottom: 30,
    borderRadius: 15,
    padding: 0,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'InknutAntiqua_600SemiBold',
    fontWeight: 'semibold'
  },
});

export default ProfileScreen;