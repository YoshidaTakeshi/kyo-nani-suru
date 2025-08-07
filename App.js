import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './src/firebase';
import HomeScreen from './src/screens/HomeScreen';
import LogDetailScreen from './src/screens/LogDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    signInAnonymously(auth)
      .then(userCredential => {
        console.log('サインイン成功:', userCredential.user.uid);
      })
      .catch(error => {
        console.error('サインイン失敗:', error);
      });
  }, []);
  
  return (
    <NavigationContainer>
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
          options={{ title: '今何する？' }}
        />
        <Stack.Screen 
          name="LogDetail" 
          component={LogDetailScreen} 
          options={{ title: '実行履歴詳細' }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
