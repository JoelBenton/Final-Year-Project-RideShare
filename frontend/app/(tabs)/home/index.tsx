import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RideCard } from '../../../src/components/rideCard';
import { NoRidesAvailableCard } from '../../../src/components/NoRidesAvailableCard';
import CustomButton from '../../../src/components/defaultButton';

const HomePage: React.FC = () => {

  const testData = {
    startName: 'HX Reef',
    startTown: 'Company',
    date: new Date(),
    endName: 'Asda',
    endTown: 'Folkestone',
    usedCapacity: 3,
    totalCapacity: 4
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.sectionTitle}>Created Trips</Text>
        <NoRidesAvailableCard text='No Trips Created' />
        <CustomButton title='See More' buttonStyle={{ width: '45%', marginBottom: 40, marginTop: 10}}/>
        <Text style={styles.sectionTitle}>Requested / Joined Trips</Text>
        <RideCard cardStyle={styles.cardStyle} showButton={false} data={testData} />
        <CustomButton title='See More' buttonStyle={{ width: '45%', marginBottom: 40, marginTop: 10}}/>
        <View style={{flexDirection: 'row', marginTop: '20%'}}>
          <CustomButton title='Create Trip' buttonStyle={{ width: '40%', marginRight: 20}}/>
          <CustomButton title='Search Trips' buttonStyle={{ width: '40%', marginLeft: 20, marginBottom: 10}}/>
        </View>
        <CustomButton title='View all active trips' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  cardStyle: {
    backgroundColor: '#ff7777'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082',
    marginVertical: 10,
  }
});

export default HomePage;