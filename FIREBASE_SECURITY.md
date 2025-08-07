# Firebase セキュリティルール設定ガイド

このプロジェクトではFirestoreとStorageのセキュリティルールが設定されています。

## 設定ファイル

- `firebase.json` - Firebase設定ファイル
- `firestore.rules` - Firestoreセキュリティルール
- `storage.rules` - Cloud Storageセキュリティルール
- `firestore.indexes.json` - Firestoreインデックス設定

## セキュリティルールの概要

### 基本ポリシー
- **認証必須**: 認証済みユーザー（匿名ユーザーを含む）のみアクセス可能
- **未認証ユーザーブロック**: 未認証ユーザーからの読み書きを防止

### Firestoreルール
```javascript
allow read, write: if request.auth != null;
```

### Storageルール
```javascript
allow read, write: if request.auth != null;
```

## デプロイ方法

Firebase CLIを使用してセキュリティルールをデプロイします：

```bash
# Firebase CLIをインストール（未インストールの場合）
npm install -g firebase-tools

# Firebaseにログイン
firebase login

# プロジェクトを初期化（初回のみ）
firebase init

# セキュリティルールをデプロイ
firebase deploy --only firestore:rules,storage
```

## 今後の拡張

現在のルールは基本的なものです。必要に応じて以下のような拡張が可能です：

- ユーザー専用データへのアクセス制限
- ファイルサイズ制限
- ファイルタイプ制限
- より詳細な読み書き権限設定

詳細な例はそれぞれのルールファイル内のコメントを参照してください。