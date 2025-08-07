import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ImageSlider from '../components/ImageSlider';

interface Props {
  route?: any;
}

const MockLogDetailScreen: React.FC<Props> = () => {
  // Mock data for testing
  const mockLogEntry = {
    id: 'mock-log-id',
    title: 'サンプル実行履歴 - 朝の散歩',
    memo: 'とても気持ちの良い朝でした。\n\n公園で桜が咲いているのを見つけました。春の訪れを感じて、心がとても温かくなりました。\n\n次回はもう少し長いルートを歩いてみたいと思います。',
    executionDate: new Date(2024, 2, 15), // March 15, 2024
    images: [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3',
    ],
    createdAt: new Date(2024, 2, 15, 8, 30),
    updatedAt: new Date(2024, 2, 15, 8, 30),
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image Slider */}
      {mockLogEntry.images.length > 0 && (
        <ImageSlider images={mockLogEntry.images} />
      )}

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{mockLogEntry.title}</Text>
        </View>

        {/* Execution Date */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>実行日</Text>
          <Text style={styles.infoValue}>{formatDate(mockLogEntry.executionDate)}</Text>
        </View>

        {/* Memo */}
        {mockLogEntry.memo && (
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>メモ</Text>
            <Text style={styles.memoText}>{mockLogEntry.memo}</Text>
          </View>
        )}

        {/* Created Date */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>作成日時</Text>
          <Text style={styles.infoValue}>
            {mockLogEntry.createdAt.toLocaleDateString('ja-JP')} {mockLogEntry.createdAt.toLocaleTimeString('ja-JP')}
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

export default MockLogDetailScreen;