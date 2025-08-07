import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Log, LogData } from '../types/Log';

interface LogListScreenProps {
  onLogPress?: (log: Log) => void;
}

export default function LogListScreen({ onLogPress }: LogListScreenProps) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const logsCollection = collection(db, 'logs');
      const logsQuery = query(logsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(logsQuery);
      
      const logsData: Log[] = querySnapshot.docs.map(doc => {
        const data = doc.data() as LogData;
        return {
          id: doc.id,
          title: data.title,
          imageUrl: data.imageUrl,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
          description: data.description,
        };
      });
      
      setLogs(logsData);
    } catch (error) {
      console.error('ログの取得に失敗しました:', error);
      Alert.alert('エラー', 'ログの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const renderLogItem = ({ item }: { item: Log }) => (
    <TouchableOpacity
      style={styles.logCard}
      onPress={() => onLogPress?.(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        )}
        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.date}>
            {item.createdAt.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          {item.description && (
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>読み込み中...</Text>
      </View>
    );
  }

  if (logs.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>まだログがありません</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={logs}
        renderItem={renderLogItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: 16,
  },
  logCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#e9ecef',
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});