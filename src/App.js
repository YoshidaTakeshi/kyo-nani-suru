import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
