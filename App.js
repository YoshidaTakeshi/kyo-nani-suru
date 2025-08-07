import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './src/firebase';

/**
 * メインアプリケーションコンポーネント
 * Firebase認証を使用した匿名ログインを実装
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
    <View style={styles.container}>
      <Text>今日なにする？</Text>
      <StatusBar style="auto" />
    </View>
  );
}

/**
 * スタイル定義
 * メインコンテナのレイアウトとデザインを設定
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',      // 水平方向の中央揃え
    justifyContent: 'center',   // 垂直方向の中央揃え
  },
});
