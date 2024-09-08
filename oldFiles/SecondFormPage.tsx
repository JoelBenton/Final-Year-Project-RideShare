// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../React-Redux-Project-Frontend/src/redux/Store'; // Adjust the import path if necessary
// import { updateForm } from '../React-Redux-Project-Frontend/src/redux/actions/userFormActions';
// import { SecondFormPageNavigationProp } from '../React-Redux-Project-Frontend/src/navigation/AppNavigator';
// import { useNavigation } from '@react-navigation/native';

// const SecondFormPage: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>(); // Typed dispatch
//     const navigation = useNavigation<SecondFormPageNavigationProp>();
//     const formData = useSelector((state: RootState) => state.form);

//     const [address, setAddress] = useState(formData.address || '');
//     const [city, setCity] = useState(formData.city || '');

//     const handleNext = () => {
//         dispatch(updateForm({ address, city }));
//         navigation.navigate('SubmitFormPage');
//     };

//     const handleBack = () => {
//         navigation.goBack();
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 value={address}
//                 onChangeText={setAddress}
//                 placeholder="Address"
//             />
//             <TextInput
//                 value={city}
//                 onChangeText={setCity}
//                 placeholder="City"
//             />
//             <View style={styles.buttonContainer}>
//                 <Button title="Back" onPress={handleBack} />
//                 <Button title="Next" onPress={handleNext} />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     buttonContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       width: '60%',
//     },
//   });

// export default SecondFormPage;