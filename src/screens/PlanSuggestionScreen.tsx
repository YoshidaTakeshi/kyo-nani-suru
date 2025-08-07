import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { fetchRandomPlan, Plan } from '../services/planService';

interface PlanSuggestionScreenProps {
  navigation: any;
}

export default function PlanSuggestionScreen({ navigation }: PlanSuggestionScreenProps) {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRandomPlan = async () => {
    try {
      setLoading(true);
      setError(null);
      const randomPlan = await fetchRandomPlan();
      setPlan(randomPlan);
    } catch (err) {
      console.error('Failed to load plan:', err);
      setError('プランの取得に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomPlan();
  }, []);

  const handleExecute = () => {
    if (plan) {
      // Navigate to history recording screen
      // For now, show an alert since the next screen isn't implemented yet
      Alert.alert(
        '実行',
        `「${plan.title}」を実行しますか？`,
        [
          { text: 'キャンセル', style: 'cancel' },
          { 
            text: '実行する', 
            onPress: () => {
              // TODO: Navigate to history recording screen
              Alert.alert('実行しました', 'プランを実行しました！');
            }
          }
        ]
      );
    }
  };

  const handleRetry = () => {
    loadRandomPlan();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>ランダムなプランを取得中...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorTitle}>エラーが発生しました</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>再試行</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!plan) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>プランが見つかりませんでした</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>再試行</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>今日のおすすめプラン</Text>
        
        <View style={styles.planCard}>
          <Text style={styles.planTitle}>{plan.title}</Text>
          {plan.description && (
            <Text style={styles.planDescription}>{plan.description}</Text>
          )}
          {plan.category && (
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>カテゴリー:</Text>
              <Text style={styles.categoryText}>{plan.category}</Text>
            </View>
          )}
          {plan.difficulty && (
            <View style={styles.difficultyContainer}>
              <Text style={styles.difficultyLabel}>難易度:</Text>
              <Text style={styles.difficultyText}>{plan.difficulty}</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.executeButton} onPress={handleExecute}>
            <Text style={styles.executeButtonText}>実行する</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.refreshButton} onPress={handleRetry}>
            <Text style={styles.refreshButtonText}>別のプランを表示</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  planDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#666',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#007AFF',
  },
  difficultyContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  difficultyLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 14,
    color: '#FF9500',
  },
  buttonContainer: {
    gap: 12,
  },
  executeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  executeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  refreshButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#FF3B30',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});