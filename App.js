import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './src/firebase';
import HomeScreen from './src/screens/HomeScreen';
import PlanSuggestionScreen from './src/screens/PlanSuggestionScreen';

const Stack = createStackNavigator();

/**
 * メインアプリケーションコンポーネント
 * Firebase認証を使用した匿名ログインとReact Navigationを実装
 */
export default function App() {
  // コンポーネントマウント時にFirebase匿名認証を実行
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
