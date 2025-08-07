import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LogListScreen from '../screens/LogListScreen';
import MockLogListScreen from '../components/MockLogListScreen';
import { Log } from '../types/Log';

interface TestAppProps {
  useMockData?: boolean;
}

export default function TestApp({ useMockData = false }: TestAppProps) {
  const [showMock, setShowMock] = React.useState(useMockData);

  const handleLogPress = (log: Log) => {
    console.log('Log selected for detail view:', {
      id: log.id,
      title: log.title,
      date: log.createdAt.toISOString(),
    });
    // Here would normally navigate to detail screen
    alert(`ログが選択されました: ${log.title}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>実行ログ一覧テスト</Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowMock(!showMock)}
        >
          <Text style={styles.toggleText}>
            {showMock ? 'Firestore版に切替' : 'モック版に切替'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {showMock ? (
        <MockLogListScreen />
      ) : (
        <LogListScreen onLogPress={handleLogPress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  toggleButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'center',
  },
  toggleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});