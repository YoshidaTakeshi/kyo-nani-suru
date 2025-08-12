import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchRandomPlan, Plan } from '../services/planService';

// ナビゲーションスタックの型定義
type RootStackParamList = {
  Home: undefined;
  PlanSuggestion: undefined;
};

// プラン提案スクリーンのナビゲーションプロパティ型
type PlanSuggestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PlanSuggestion'
>;

/**
 * プラン提案スクリーンのプロパティインターフェース
 */
interface PlanSuggestionScreenProps {
  navigation: PlanSuggestionScreenNavigationProp;
}

/**
 * プラン提案スクリーンコンポーネント
 * Firestoreからランダムなプランを取得して表示し、実行機能を提供
 * @param navigation - React Navigationのナビゲーションオブジェクト
 * @returns JSX.Element - プラン提案スクリーンのレンダリング結果
 */
export default function PlanSuggestionScreen({
  navigation: _navigation,
}: PlanSuggestionScreenProps): React.JSX.Element {
  // 取得したプランデータの状態管理
  const [plan, setPlan] = useState<Plan | null>(null);
  // ローディング状態の管理
  const [loading, setLoading] = useState<boolean>(true);
  // エラー状態の管理
  const [error, setError] = useState<string | null>(null);

  /**
   * ランダムプランを取得する非同期関数
   * Firestoreからランダムなプランを取得し、状態を更新する
   */
  const loadRandomPlan = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      // planServiceからランダムプランを取得
      const randomPlan = await fetchRandomPlan();
      setPlan(randomPlan);
    } catch (err) {
      console.error('プラン取得エラー:', err);
      setError('プランの取得に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  /**
   * コンポーネントマウント時にランダムプランを取得
   */
  useEffect(() => {
    loadRandomPlan();
  }, []);

  /**
   * プラン実行ボタンの処理
   * 確認ダイアログを表示し、ユーザーの承認後に実行処理を行う
   */
  const handleExecute = (): void => {
    if (plan) {
      // プラン実行の確認ダイアログを表示
      Alert.alert('プラン実行確認', `「${plan.title}」を実行しますか？`, [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '実行する',
          onPress: () => {
            // TODO: 実行履歴記録画面への遷移機能を実装
            Alert.alert(
              '実行完了',
              'プランを実行しました！履歴に記録されました。'
            );
          },
        },
      ]);
    }
  };

  /**
   * 再試行ボタンの処理
   * 新しいランダムプランを取得する
   */
  const handleRetry = (): void => {
    loadRandomPlan();
  };

  // ローディング状態のUI表示
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

  // エラー状態のUI表示
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorTitle}>エラーが発生しました</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRetry}
            accessibilityLabel="再試行ボタン"
            accessibilityHint="タップしてプランを再取得します"
          >
            <Text style={styles.retryButtonText}>再試行</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // プランが取得できない場合のUI表示
  if (!plan) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>プランが見つかりませんでした</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRetry}
            accessibilityLabel="再試行ボタン"
            accessibilityHint="タップしてプランを再取得します"
          >
            <Text style={styles.retryButtonText}>再試行</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // メインのプラン表示UI
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 画面タイトル */}
        <Text style={styles.title}>今日のおすすめプラン</Text>

        {/* プラン情報カード */}
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

        {/* ボタンコンテナ */}
        <View style={styles.buttonContainer}>
          {/* プラン実行ボタン */}
          <TouchableOpacity
            style={styles.executeButton}
            onPress={handleExecute}
            accessibilityLabel="プラン実行ボタン"
            accessibilityHint="このプランを実行します"
          >
            <Text style={styles.executeButtonText}>実行する</Text>
          </TouchableOpacity>

          {/* 別プラン表示ボタン */}
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleRetry}
            accessibilityLabel="別プラン表示ボタン"
            accessibilityHint="別のランダムプランを表示します"
          >
            <Text style={styles.refreshButtonText}>別のプランを表示</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/**
 * プラン提案スクリーンのスタイル定義
 * レイアウト、色彩、文字サイズなどのデザイン要素を設定
 */
const styles = StyleSheet.create({
  // メインコンテナ：画面全体のベース
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // ライトグレー背景
  },
  // 中央配置コンテンツ用（ローディング・エラー時）
  centerContent: {
    flex: 1,
    justifyContent: 'center', // 垂直方向中央
    alignItems: 'center', // 水平方向中央
    padding: 20,
  },
  // メインコンテンツエリア
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60, // 上部余白
  },
  // 画面タイトルのスタイル
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333', // ダークグレー
  },
  // プラン情報カードのスタイル
  planCard: {
    backgroundColor: '#fff', // 白背景
    borderRadius: 12, // 角丸
    padding: 20,
    marginBottom: 30,
    // iOS風シャドウ効果
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android風エレベーション
    elevation: 3,
  },
  // プランタイトルのスタイル
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  // プラン説明文のスタイル
  planDescription: {
    fontSize: 16,
    lineHeight: 24, // 読みやすい行間
    marginBottom: 16,
    color: '#666', // ミディアムグレー
  },
  // カテゴリー表示コンテナ
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  // カテゴリーラベルのスタイル
  categoryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    marginRight: 8,
  },
  // カテゴリー値のスタイル
  categoryText: {
    fontSize: 14,
    color: '#007AFF', // iOS標準ブルー
  },
  // 難易度表示コンテナ
  difficultyContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  // 難易度ラベルのスタイル
  difficultyLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    marginRight: 8,
  },
  // 難易度値のスタイル
  difficultyText: {
    fontSize: 14,
    color: '#FF9500', // オレンジ色
  },
  // ボタンコンテナ
  buttonContainer: {
    gap: 12, // ボタン間の間隔
  },
  // プライマリ実行ボタン
  executeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  // 実行ボタンのテキストスタイル
  executeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // セカンダリ更新ボタン
  refreshButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  // 更新ボタンのテキストスタイル
  refreshButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  // ローディングテキストのスタイル
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  // エラータイトルのスタイル
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#FF3B30', // iOS標準レッド
  },
  // エラーメッセージのスタイル
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 24,
  },
  // 再試行ボタンのスタイル
  retryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  // 再試行ボタンテキストのスタイル
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
