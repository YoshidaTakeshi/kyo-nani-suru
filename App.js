import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { auth } from './src/firebase';
import { signInAnonymously } from 'firebase/auth';

/**
 * メインアプリケーションコンポーネント
 * Firebaseの匿名認証を実行し、基本的なUIを表示する
 */
export default function App() {
  // Firebaseの匿名認証を実行するEffect
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
    <View style={styles.container}>
      <Text>今日何する？アプリを開発中です！</Text>
      <StatusBar style="auto" />
    </View>
  );
}

/**
 * アプリケーションのスタイル定義
 * メインコンテナの中央配置レイアウトを定義
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
