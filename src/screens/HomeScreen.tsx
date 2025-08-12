import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// ナビゲーションスタックの型定義
type RootStackParamList = {
  Home: undefined;
  PlanSuggestion: undefined;
};

// ホームスクリーンのナビゲーションプロパティ型
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

/**
 * ホームスクリーンのプロパティインターフェース
 */
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

/**
 * ホームスクリーンコンポーネント
 * アプリのメイン画面で、ランダムプラン提案画面への導線を提供
 * @param navigation - React Navigationのナビゲーションオブジェクト
 * @returns JSX.Element - ホームスクリーンのレンダリング結果
 */
export default function HomeScreen({
  navigation,
}: HomeScreenProps): React.JSX.Element {
  /**
   * プラン提案画面への遷移処理
   * ボタンタップ時にPlanSuggestionScreenに遷移する
   */
  const handleNavigateToPlanSuggestion = (): void => {
    navigation.navigate('PlanSuggestion');
  };

  return (
    <View style={styles.container}>
      {/* アプリタイトル */}
      <Text style={styles.title}>今日何する？</Text>
      {/* サブタイトル説明 */}
      <Text style={styles.subtitle}>
        ランダムなプランで新しい体験を始めよう
      </Text>

      {/* プラン提案画面遷移ボタン */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToPlanSuggestion}
        accessibilityLabel="ランダムプランを見るボタン"
        accessibilityHint="タップするとランダムなプラン提案画面に移動します"
      >
        <Text style={styles.buttonText}>ランダムプランを見る</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * ホームスクリーンのスタイル定義
 * メインコンテナとUI要素のデザインを設定
 */
const styles = StyleSheet.create({
  // メインコンテナ：画面全体のレイアウト
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // ライトグレー背景
    justifyContent: 'center', // 垂直方向中央配置
    alignItems: 'center', // 水平方向中央配置
    padding: 20, // 外側余白
  },
  // メインタイトルのスタイル
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // ダークグレー文字色
    textAlign: 'center',
  },
  // サブタイトルのスタイル
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: '#666', // ミディアムグレー文字色
    textAlign: 'center',
    lineHeight: 24, // 行間調整
  },
  // プライマリボタンのスタイル
  button: {
    backgroundColor: '#007AFF', // iOS標準ブルー
    borderRadius: 12, // 角丸
    paddingVertical: 16, // 上下内側余白
    paddingHorizontal: 32, // 左右内側余白
    // iOS風シャドウ
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
  // ボタン内テキストのスタイル
  buttonText: {
    color: '#fff', // 白文字
    fontSize: 18,
    fontWeight: 'bold',
  },
});
