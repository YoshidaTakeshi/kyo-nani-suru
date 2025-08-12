import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './src/firebase';
import HomeScreen from './src/screens/HomeScreen';
import PlanSuggestionScreen from './src/screens/PlanSuggestionScreen';

// ナビゲーションスタックの型定義
export type RootStackParamList = {
  Home: undefined;
  PlanSuggestion: undefined;
};

// React Navigationのスタックナビゲーターを作成
const Stack = createStackNavigator();

/**
 * メインアプリケーションコンポーネント
 *
 * このコンポーネントはアプリケーションのエントリーポイントとして機能し、
 * 以下の主要機能を提供します：
 * - Firebase匿名認証の自動実行
 * - React Navigationを使用したスクリーン遷移管理
 * - アプリ全体のナビゲーション構造の定義
 *
 * @returns React.JSX.Element - アプリケーション全体のコンポーネントツリー
 */
export default function App(): React.JSX.Element {
  /**
   * コンポーネントマウント時にFirebase匿名認証を実行
   * ユーザーがアプリを起動した際に自動的に匿名ユーザーとしてログイン
   */
  useEffect(() => {
    const performAnonymousSignIn = async (): Promise<void> => {
      try {
        const userCredential = await signInAnonymously(auth);
        console.log('Firebase匿名サインイン成功:', userCredential.user.uid);
      } catch (error) {
        console.error('Firebase匿名サインイン失敗:', error);
      }
    };

    performAnonymousSignIn();
  }, []);

  return (
    <NavigationContainer>
      {/* ステータスバーの設定（auto = システムテーマに追従） */}
      <StatusBar style="auto" />

      {/* スタックナビゲーターの設定 */}
      {/* @ts-expect-error - React Navigation v7 の型定義の問題を回避 */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          // ヘッダーのスタイル設定
          headerStyle: {
            backgroundColor: '#007AFF', // iOS標準ブルー
          },
          headerTintColor: '#fff', // ヘッダーテキスト色
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* ホームスクリーン */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '今日何する？' }}
        />

        {/* プラン提案スクリーン */}
        <Stack.Screen
          name="PlanSuggestion"
          component={PlanSuggestionScreen}
          options={{ title: 'プラン提案' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
