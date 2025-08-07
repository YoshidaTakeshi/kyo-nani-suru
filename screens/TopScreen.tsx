import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type TopScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Top'>;

interface Props {
  navigation: TopScreenNavigationProp;
}

export default function TopScreen({ navigation }: Props) {
  const handleStart = () => {
    // Navigate to next screen
    navigation.navigate('Next');
    console.log('はじめるボタンが押されました');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>今日なにする？</Text>
      <Pressable 
        style={styles.startButton} 
        onPress={handleStart}
        testID="start-button"
      >
        <Text style={styles.startButtonText}>はじめる</Text>
      </Pressable>
    </View>
  );
}

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
    color: '#333',
    marginBottom: 60,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});