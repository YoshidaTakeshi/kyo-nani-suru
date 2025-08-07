import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './src/firebase';
import Navigation from './src/Navigation';

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
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}
