# 今日何する？（kyo-nani-suru）

React Native + Expo + TypeScript で構築されたモバイルアプリケーションです。

## 概要

このプロジェクトは「今日何をするか」を管理・追跡するためのモバイルアプリケーションです。Firebase を使用したバックエンド統合により、リアルタイムでのデータ同期と認証機能を提供します。

## 技術スタック

- **React Native**: クロスプラットフォームモバイル開発
- **Expo**: 開発とデプロイメントの簡素化
- **TypeScript**: 型安全性とコード品質の向上
- **Firebase**: 認証、データベース、ストレージ

## セットアップ

### 必要な環境

- Node.js 20.17.0
- npm 11.5.2
- Expo CLI

### インストール手順

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm start

# プラットフォーム別の起動コマンド
npm run android  # Android向け
npm run ios      # iOS向け  
npm run web      # Web向け
```

## プロジェクト構造

```
kyo-nani-suru/
├── App.js                 # メインアプリケーションコンポーネント
├── index.js               # エントリーポイント
├── src/
│   └── firebase.ts        # Firebase設定ファイル
├── assets/                # 画像・アイコンなどのリソース
├── .vscode/
│   └── settings.json      # VS Code設定（Copilot日本語対応）
├── package.json           # プロジェクト設定と依存関係
└── tsconfig.json          # TypeScript設定
```

## 開発ガイドライン

### コメント規約

- **日本語コメント**: すべてのコメントは日本語で記述します
- **関数説明**: 関数の目的と動作を明確に記述します
- **型定義**: TypeScriptの型やinterfaceには日本語での説明を含めます

### GitHub Copilot設定

このプロジェクトは日本語での開発体験を向上させるため、GitHub Copilotが日本語でコメントやコード提案を行うよう設定されています。

- `.vscode/settings.json`でCopilotの言語設定を日本語に指定
- コメント生成、ドキュメント生成、コード提案説明がすべて日本語対応

## Firebase設定

プロジェクトはFirebaseと統合されており、以下の機能を提供します：

- **認証**: 匿名認証によるユーザー管理
- **Firestore**: リアルタイムデータベース
- **Storage**: ファイル保存とアクセス
- **Analytics**: アプリ利用状況の分析

## 貢献方法

1. プロジェクトをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/新機能名`)
3. 変更をコミット (`git commit -am '新機能を追加'`)
4. ブランチにプッシュ (`git push origin feature/新機能名`)
5. プルリクエストを作成

## ライセンス

このプロジェクトはプライベートライセンスの下で公開されています。

## 連絡先

プロジェクトに関する質問や提案がある場合は、Issueを作成してください。