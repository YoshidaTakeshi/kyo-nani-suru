import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogListScreen from '../screens/LogListScreen';
import { Log } from '../types/Log';

// Mock data for testing the LogListScreen
const mockLogs: Log[] = [
  {
    id: '1',
    title: 'サンプルログ1',
    imageUrl: 'https://picsum.photos/200/200?random=1',
    createdAt: new Date('2024-01-15T10:30:00'),
    description: 'これはサンプルのログの説明です。',
  },
  {
    id: '2',
    title: 'サンプルログ2',
    imageUrl: 'https://picsum.photos/200/200?random=2',
    createdAt: new Date('2024-01-14T15:45:00'),
    description: 'もう一つのサンプルログです。',
  },
  {
    id: '3',
    title: 'サンプルログ3（画像なし）',
    createdAt: new Date('2024-01-13T09:20:00'),
    description: '画像のないログのサンプルです。',
  },
];

// Mock LogListScreen component for testing
const MockLogListScreen: React.FC = () => {
  const handleLogPress = (log: Log) => {
    console.log('ログが選択されました:', log.title);
  };

  // Simple implementation that shows mock data
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ログ一覧 (モックデータ)</Text>
      {mockLogs.map((log) => (
        <View key={log.id} style={styles.logItem}>
          <Text style={styles.logTitle}>{log.title}</Text>
          <Text style={styles.logDate}>
            {log.createdAt.toLocaleDateString('ja-JP')}
          </Text>
          {log.description && (
            <Text style={styles.logDescription}>{log.description}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  logItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  logDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  logDescription: {
    fontSize: 14,
    color: '#888',
  },
});

export default MockLogListScreen;