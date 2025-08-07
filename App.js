import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './src/firebase';
import LogCreateScreen from './screens/LogCreateScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    signInAnonymously(auth)
      .then(userCredential => {
        console.log('サインイン成功:', userCredential.user.uid);
        setIsAuthenticated(true);
      })
      .catch(error => {
        console.error('サインイン失敗:', error);
      });
  }, []);

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text>認証中...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <LogCreateScreen planId="test-plan-123" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
