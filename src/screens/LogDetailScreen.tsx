import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { LogEntry, LogDetailScreenParams } from '../types';
import ImageSlider from '../components/ImageSlider';

interface Props {
  route: {
    params: LogDetailScreenParams;
  };
}

const LogDetailScreen: React.FC<Props> = ({ route }) => {
  const { logId } = route.params;
  const [logEntry, setLogEntry] = useState<LogEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogDetails();
  }, [logId]);

  const fetchLogDetails = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'logs', logId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const log: LogEntry = {
          id: docSnap.id,
          title: data.title || '',
          memo: data.memo || '',
          executionDate: data.executionDate?.toDate() || new Date(),
          images: data.images || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
        setLogEntry(log);
      } else {
        Alert.alert('エラー', '履歴が見つかりませんでした');
      }
    } catch (error) {
      console.error('Error fetching log details:', error);
      Alert.alert('エラー', '履歴の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>読み込み中...</Text>
      </View>
    );
  }

  if (!logEntry) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>履歴が見つかりませんでした</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Image Slider */}
      {logEntry.images.length > 0 && (
        <ImageSlider images={logEntry.images} />
      )}

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{logEntry.title}</Text>
        </View>

        {/* Execution Date */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>実行日</Text>
          <Text style={styles.infoValue}>{formatDate(logEntry.executionDate)}</Text>
        </View>

        {/* Memo */}
        {logEntry.memo && (
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>メモ</Text>
            <Text style={styles.memoText}>{logEntry.memo}</Text>
          </View>
        )}

        {/* Created Date */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>作成日時</Text>
          <Text style={styles.infoValue}>
            {logEntry.createdAt.toLocaleDateString('ja-JP')} {logEntry.createdAt.toLocaleTimeString('ja-JP')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
  },
  contentSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 32,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  memoText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
});

export default LogDetailScreen;