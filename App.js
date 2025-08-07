import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './src/firebase';
import HomeScreen from './src/screens/HomeScreen';
import PlanSuggestionScreen from './src/screens/PlanSuggestionScreen';
import { addSamplePlans } from './src/services/sampleData';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    signInAnonymously(auth)
      .then(userCredential => {
        console.log('サインイン成功:', userCredential.user.uid);
        // Add sample data (only for development/testing)
        addSamplePlans().catch(console.error);
      })
      .catch(error => {
        console.error('サインイン失敗:', error);
      });
  }, []);
  
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: '今日何する？' }}
        />
        <Stack.Screen 
          name="PlanSuggestion" 
          component={PlanSuggestionScreen}
          options={{ title: 'プラン提案' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


