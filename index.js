/**
 * アプリケーションエントリーポイント
 *
 * ExpoのregisterRootComponentを使用してメインAppコンポーネントを登録します。
 * このファイルにより、Expo Goまたはネイティブビルドのいずれでアプリを
 * 読み込んでも、適切な環境が設定されます。
 */
import { registerRootComponent } from 'expo';
import App from './App';

// メインAppコンポーネントをルートコンポーネントとして登録
registerRootComponent(App);
