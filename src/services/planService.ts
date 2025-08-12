import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * プランデータの型定義インターフェース
 * Firestoreから取得するプラン情報の構造を定義
 */
export interface Plan {
  /** プランの一意識別子 */
  id: string;
  /** プランのタイトル（必須） */
  title: string;
  /** プランの詳細説明（任意） */
  description?: string;
  /** プランのカテゴリー（任意） */
  category?: string;
  /** プランの難易度（任意） */
  difficulty?: string;
}

/**
 * Firestoreからランダムなプランを取得する非同期関数
 *
 * この関数は以下の処理を実行します：
 * 1. Firestoreの'plans'コレクションから最大50件のプランを取得
 * 2. 取得したプランの中からランダムに1つを選択
 * 3. 選択されたプランオブジェクトを返却
 *
 * @returns Promise<Plan> - ランダムに選択されたプランオブジェクト
 * @throws Error - プランが見つからない場合やFirestoreエラーが発生した場合
 *
 * @example
 * ```typescript
 * try {
 *   const randomPlan = await fetchRandomPlan();
 *   console.log('取得したプラン:', randomPlan.title);
 * } catch (error) {
 *   console.error('プラン取得エラー:', error);
 * }
 * ```
 */
export const fetchRandomPlan = async (): Promise<Plan> => {
  try {
    // Firestoreの'plans'コレクションへの参照を取得
    const plansRef = collection(db, 'plans');

    // クエリを作成（最大50件に制限してパフォーマンスを最適化）
    const q = query(plansRef, limit(50));

    // Firestoreからプランデータを取得
    const querySnapshot = await getDocs(q);

    // プランが存在しない場合はエラーを投げる
    if (querySnapshot.empty) {
      throw new Error('データベースにプランが見つかりません');
    }

    // Firestoreの DocumentSnapshot を Plan オブジェクトの配列に変換
    const plans: Plan[] = [];
    querySnapshot.forEach(doc => {
      plans.push({
        id: doc.id,
        ...doc.data(),
      } as Plan);
    });

    // 配列からランダムなインデックスを選択
    const randomIndex = Math.floor(Math.random() * plans.length);

    // ランダムに選択されたプランを返却
    return plans[randomIndex];
  } catch (error) {
    // エラーログを出力
    console.error('ランダムプラン取得エラー:', error);
    // エラーを再投げして呼び出し元でハンドリング可能にする
    throw error;
  }
};
