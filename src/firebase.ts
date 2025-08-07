/**
 * Firebase設定ファイル
 * Firebaseの初期化とサービスのエクスポートを行う
 */

// Firebase SDKから必要な関数をインポート
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

/**
 * Firebase設定オブジェクト
 * プロジェクト固有の認証情報と設定を含む
 */
const firebaseConfig = {
  apiKey: "AIzaSyB8pk56rzDmHEt3m4O4ooSGTtJfn9Gvv3s",
  authDomain: "kyo-nani-suru.firebaseapp.com",
  projectId: "kyo-nani-suru",
  storageBucket: "kyo-nani-suru.firebasestorage.app",
  messagingSenderId: "977402062356",
  appId: "1:977402062356:web:720927866dcb057c63a901",
  measurementId: "G-WHTX61ST3J"
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// Analyticsを初期化（ウェブ環境でのみ使用）
const analytics = getAnalytics(app);

// 各Firebaseサービスを初期化してエクスポート
export const auth = getAuth(app);        // 認証サービス
export const db = getFirestore(app);     // Firestoreデータベース
export const storage = getStorage(app);  // Cloud Storage