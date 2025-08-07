import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const navigateToLogDetail = () => {
    navigation.navigate('LogDetail', { logId: 'sample-log-id' });
  };

  const navigateToMockLogDetail = () => {
    navigation.navigate('MockLogDetail');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>今何する？</Text>
      <Text style={styles.subtitle}>実行履歴</Text>
      
      <TouchableOpacity style={styles.button} onPress={navigateToLogDetail}>
        <Text style={styles.buttonText}>サンプル履歴を見る</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.mockButton]} onPress={navigateToMockLogDetail}>
        <Text style={styles.buttonText}>モック履歴を見る</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 15,
  },
  mockButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;