/**
 * Firebase設定ファイル
 * 
 * このファイルはFirebaseの初期化と設定を行います。
 * 認証、データベース、ストレージ、アナリティクスの各サービスを初期化し、
 * アプリケーション全体で使用できるようエクスポートします。
 */

// Firebase SDKから必要な関数をインポート
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase設定オブジェクト
// プロジェクト固有の設定値を含む
const firebaseConfig = {
  apiKey: "AIzaSyB8pk56rzDmHEt3m4O4ooSGTtJfn9Gvv3s",
  authDomain: "kyo-nani-suru.firebaseapp.com",
  projectId: "kyo-nani-suru",
  storageBucket: "kyo-nani-suru.firebasestorage.app",
  messagingSenderId: "977402062356",
  appId: "1:977402062356:web:720927866dcb057c63a901",
  measurementId: "G-WHTX61ST3J"
};

// Firebaseアプリケーションを初期化
const app = initializeApp(firebaseConfig);

// Analyticsサービスを初期化（アプリ使用状況の追跡用）
const analytics = getAnalytics(app);

// 各Firebaseサービスのインスタンスをエクスポート
export const auth = getAuth(app);           // 認証サービス
export const db = getFirestore(app);        // Firestoreデータベース
export const storage = getStorage(app);     // Cloud Storage
