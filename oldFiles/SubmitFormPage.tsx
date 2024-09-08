// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../React-Redux-Project-Frontend/src/redux/reducers';
// import { useNavigation } from '@react-navigation/native';
// import { SubmitFormPageNavigationProp } from '../React-Redux-Project-Frontend/src/navigation/AppNavigator';

// const SubmitFormPage: React.FC = () => {
//     const formData = useSelector((state: RootState) => state.form);
//     const navigation = useNavigation<SubmitFormPageNavigationProp>();


//     const handleSubmit = () => {
//         console.log('Form Data Submitted:', formData);
//         // Add your submission logic here
//     };
//     const handleBack = () => {
//     navigation.goBack();
//         };

//     return (
//         <View style={styles.container}>
//             <Text>Password: {formData.password}</Text>
//             <Text>Email: {formData.email}</Text>
//             <Text>Address: {formData.address}</Text>
//             <Text>City: {formData.city}</Text>
//             <View style={styles.buttonContainer}>
//                 <Button title="Back" onPress={handleBack} />
//                 <Button title="Submit" onPress={handleSubmit} />
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

// export default SubmitFormPage;