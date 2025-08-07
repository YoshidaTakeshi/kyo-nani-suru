import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './src/firebase';
import LogListScreen from './src/screens/LogListScreen';
import { Log } from './src/types/Log';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    signInAnonymously(auth)
      .then(userCredential => {
        console.log('サインイン成功:', userCredential.user.uid);
        setIsSignedIn(true);
      })
      .catch(error => {
        console.error('サインイン失敗:', error);
      });
  }, []);

  const handleLogPress = (log: Log) => {
    console.log('ログが選択されました:', log.title);
    // ここで詳細画面への遷移を実装します
    // 現在は詳細画面がないため、コンソールログのみ
  };

  if (!isSignedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>サインイン中...</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>実行ログ一覧</Text>
      </View>
      <LogListScreen onLogPress={handleLogPress} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
  },
});
