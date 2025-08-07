# LogListScreen 実装ドキュメント

## 概要
実行ログを一覧表示する画面の実装です。Firestoreからログデータを取得し、時系列順（降順）で表示します。

## 実装されたファイル

### `/src/screens/LogListScreen.tsx`
メインのログ一覧画面コンポーネント

**機能:**
- Firestoreの`logs`コレクションからデータを取得
- `createdAt`フィールドで降順ソート
- FlatListを使用したカード形式の表示
- 画像サムネイル、タイトル、日付、説明の表示
- タップによる詳細画面への遷移（コールバック経由）
- ローディング状態とエラーハンドリング
- 空の状態の表示

### `/src/types/Log.ts`
ログデータの型定義

**型:**
- `Log`: アプリケーション内で使用するログオブジェクト
- `LogData`: Firestoreから取得する生データ

### `/src/components/TestApp.tsx`
テスト用のアプリケーションコンポーネント

### `/src/components/MockLogListScreen.tsx`
モックデータを使用したテスト用コンポーネント

## Firestore データ構造

ログは `logs` コレクションに以下の形式で保存される必要があります:

```typescript
{
  title: string;        // ログのタイトル（必須）
  imageUrl?: string;    // 画像のURL（オプション）
  createdAt: Timestamp; // 作成日時（必須、Firestore Timestamp）
  description?: string; // 説明文（オプション）
}
```

## 使用方法

```tsx
import LogListScreen from './src/screens/LogListScreen';
import { Log } from './src/types/Log';

function App() {
  const handleLogPress = (log: Log) => {
    // 詳細画面への遷移処理
    console.log('選択されたログ:', log);
  };

  return (
    <LogListScreen onLogPress={handleLogPress} />
  );
}
```

## 受け入れ条件の達成状況

- ✅ **ログ一覧が時系列順に表示される**: `orderBy('createdAt', 'desc')`で実装
- ✅ **各ログカードに必要な情報が表示される**: 画像サムネイル、タイトル、日付、説明を表示
- ✅ **タップで詳細画面に正常に遷移する**: `onLogPress`コールバックで実装

## 今後の拡張予定

1. ナビゲーションライブラリの追加と詳細画面の実装
2. 画像の遅延読み込み対応
3. 無限スクロール対応
4. オフラインキャッシュ対応
5. プルリフレッシュ機能

## デザイン仕様

- **カラーパレット**: Material Design inspired
- **レイアウト**: カード形式、16pxマージン
- **タイポグラフィ**: タイトル16px/600、日付・説明14px
- **画像**: 80x80px、8px角丸
- **シャドウ**: elevation 3, shadowOpacity 0.1