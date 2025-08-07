import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Top: undefined;
  PlanSuggestion: undefined;
};

type PlanSuggestionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlanSuggestion'>;

interface PlanSuggestionScreenProps {
  navigation: PlanSuggestionScreenNavigationProp;
}

const PlanSuggestionScreen: React.FC<PlanSuggestionScreenProps> = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>プラン提案</Text>
      <Text style={styles.subtitle}>あなたにおすすめのプランを提案します</Text>
      
      <View style={styles.planContainer}>
        <Text style={styles.planText}>今日のおすすめプラン：</Text>
        <Text style={styles.planDescription}>
          カフェでゆっくり読書をして、
          {'\n'}
          その後公園を散歩してみませんか？
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleGoBack}
      >
        <Text style={styles.buttonText}>戻る</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  planContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
    width: '100%',
  },
  planText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  planDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#6c757d',
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

export default PlanSuggestionScreen;