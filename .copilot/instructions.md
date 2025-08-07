# GitHub Copilot プロンプト設定

このプロジェクトでのコード生成時に以下のガイドラインに従ってください：

## 言語とコメント
- すべてのコメントは日本語で記述する
- 関数やクラスの説明にはJSDocスタイルのコメントを使用
- 変数名や関数名は英語、コメントや説明は日本語

## コーディングスタイル
- TypeScriptを使用し、型安全性を重視
- React Nativeのベストプラクティスに従う
- Firebase統合時は適切なエラーハンドリングを含める

## 関数とコンポーネント
- 関数の目的を明確に説明
- パラメータと戻り値の説明を含める
- React Functional Componentsを使用

## 例：
```typescript
/**
 * ユーザー情報を取得する関数
 * @param userId - ユーザーID
 * @returns Promise<UserData> - ユーザーデータオブジェクト
 */
const fetchUserData = async (userId: string): Promise<UserData> => {
  // Firebase Firestoreからユーザー情報を取得
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    throw new Error('ユーザーが見つかりません');
  } catch (error) {
    console.error('ユーザー情報取得エラー:', error);
    throw error;
  }
};
```