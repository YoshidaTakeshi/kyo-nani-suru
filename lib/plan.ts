import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../src/firebase';

/**
 * プランコレクション用のデータ構造
 */
export interface Plan {
  id: string;
  title: string;
  category: string;
  level: number;
  estimatedTime: number; // 分単位の所要時間
}

/**
 * Firestoreのプランコレクションからランダムにプランを取得する関数
 * @returns Promise<Plan | null> - ランダムなプランまたはプランが存在しない場合はnull
 */
export async function fetchRandomPlan(): Promise<Plan | null> {
  try {
    // プランコレクションの参照を取得
    const plansCollection = collection(db, 'plans');
    const plansQuery = query(plansCollection);

    // Firestoreからすべてのプランを取得
    const querySnapshot = await getDocs(plansQuery);

    // プランが存在するかチェック
    if (querySnapshot.empty) {
      console.warn('コレクションにプランが見つかりません');
      return null;
    }

    // ドキュメントをPlanオブジェクトに変換
    const plans: Plan[] = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      plans.push({
        id: doc.id,
        title: data.title,
        category: data.category,
        level: data.level,
        estimatedTime: data.estimatedTime,
      });
    });

    // ランダムなプランを返す
    const randomIndex = Math.floor(Math.random() * plans.length);
    return plans[randomIndex];
  } catch (error) {
    console.error('ランダムプラン取得エラー:', error);
    throw new Error(
      `ランダムプランの取得に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`
    );
  }
}
