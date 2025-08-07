import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Top: undefined;
  PlanSuggestion: undefined;
};

type TopScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Top'>;

interface TopScreenProps {
  navigation: TopScreenNavigationProp;
}

const TopScreen: React.FC<TopScreenProps> = ({ navigation }) => {
  const handlePlanSuggestion = () => {
    navigation.navigate('PlanSuggestion');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>今日何する？</Text>
      <Text style={styles.subtitle}>プランを提案します</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handlePlanSuggestion}
      >
        <Text style={styles.buttonText}>プラン提案へ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TopScreen;