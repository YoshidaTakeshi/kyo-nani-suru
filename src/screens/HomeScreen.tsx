import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const handleNavigateToPlanSuggestion = () => {
    navigation.navigate('PlanSuggestion');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>今日何する？</Text>
      <Text style={styles.subtitle}>ランダムなプランで新しい体験を始めよう</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleNavigateToPlanSuggestion}
      >
        <Text style={styles.buttonText}>ランダムプランを見る</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});