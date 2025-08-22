# プランコレクション実装

このプロジェクトはFirestoreコレクションからランダムなプランを管理・取得する機能を提供します。

## 作成されたファイル

### `lib/plan.ts`

- 必要なフィールドを持つ`Plan`インターフェースを定義: id, title, category, level, estimatedTime
- Firestoreからランダムなプランを取得する`fetchRandomPlan()`関数を実装
- 包括的なエラーハンドリングを含む

### `lib/seedPlans.ts`

- 複数のカテゴリにわたる10個の多様なプランのサンプルデータを含む
- Firestoreコレクションを初期化する`seedPlansCollection()`関数を実装
- 運動、学習、生活、娯楽、社交、趣味などの様々な活動を含むプラン

## 使用方法

### コレクションの初期化

```typescript
import { seedPlansCollection } from './lib/seedPlans';

// サンプルデータでコレクションを初期化するために一度実行
await seedPlansCollection();
```

### ランダムプランの取得

```typescript
import { fetchRandomPlan } from './lib/plan';

// ランダムなプランを取得
const plan = await fetchRandomPlan();
if (plan) {
  console.log(`今日の活動: ${plan.title}`);
  console.log(
    `カテゴリ: ${plan.category}, レベル: ${plan.level}, 時間: ${plan.estimatedTime}分`
  );
} else {
  console.log(
    '利用可能なプランがありません - 最初にコレクションを初期化してください'
  );
}
```

## データ構造

各プランには以下が含まれます：

- `id`: 一意の識別子（文字列）
- `title`: 活動名（文字列）
- `category`: 活動の種類（運動、学習、生活、娯楽、社交、趣味）
- `level`: 難易度レベル（1-3、1が最も簡単）
- `estimatedTime`: 予想所要時間（分単位の数値）

## エラーハンドリング

両方の関数には適切なエラーハンドリングが含まれています：

- `fetchRandomPlan()`はプランが存在しない場合にnullを返し、Firestoreの問題に対してはエラーをthrowします
- `seedPlansCollection()`は初期化に失敗した場合に詳細なエラーをthrowします
- すべてのエラーはデバッグ用にコンソールに記録されます

## Firebase要件

認証設定に基づいて、Firestoreセキュリティルールが`plans`コレクションへの読み書きアクセスを許可していることを確認してください。
