import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * サンプルプランデータの配列
 * アプリケーションの開発・テスト用として用意された初期データ
 * 各プランは title, description, category, difficulty を含む
 */
const samplePlans = [
  {
    title: '近所の公園を散歩する',
    description:
      '新鮮な空気を吸いながら、のんびりと公園を歩いてリフレッシュしましょう。',
    category: '運動・健康',
    difficulty: '簡単',
  },
  {
    title: '新しいレシピに挑戦する',
    description: 'いつもと違う料理を作ってみて、新しい味を発見しましょう。',
    category: '料理・グルメ',
    difficulty: '普通',
  },
  {
    title: '本を一冊読む',
    description:
      '興味のある本を選んで、知識を深めたり物語の世界に浸りましょう。',
    category: '学習・読書',
    difficulty: '普通',
  },
  {
    title: '写真を撮りに出かける',
    description: '身近な風景や面白いものを見つけて写真に収めてみましょう。',
    category: '趣味・創作',
    difficulty: '簡単',
  },
  {
    title: '友人に連絡を取る',
    description:
      'しばらく連絡していない友人に電話やメッセージを送ってみましょう。',
    category: '人間関係',
    difficulty: '簡単',
  },
];

/**
 * サンプルプランをFirestoreに追加する非同期関数
 *
 * この関数は開発・テスト環境での初期データ投入に使用されます。
 * 定義済みのサンプルプランをFirestoreの'plans'コレクションに順次追加します。
 *
 * 実行フロー：
 * 1. Firestoreの'plans'コレクションへの参照を取得
 * 2. サンプルプラン配列をループ処理
 * 3. 各プランをFirestoreに追加
 * 4. 追加完了をコンソールにログ出力
 *
 * @returns Promise<void> - 非同期処理の完了を示すPromise
 * @throws Error - Firestoreへの書き込みエラーが発生した場合
 *
 * @example
 * ```typescript
 * try {
 *   await addSamplePlans();
 *   console.log('サンプルデータの追加が完了しました');
 * } catch (error) {
 *   console.error('サンプルデータ追加エラー:', error);
 * }
 * ```
 */
export const addSamplePlans = async (): Promise<void> => {
  try {
    // Firestoreの'plans'コレクションへの参照を取得
    const plansRef = collection(db, 'plans');

    // サンプルプラン配列をループ処理して各プランを追加
    for (const plan of samplePlans) {
      // Firestoreにプランドキュメントを追加
      await addDoc(plansRef, plan);
      console.log('プラン追加完了:', plan.title);
    }

    // 全プラン追加完了をログ出力
    console.log('すべてのサンプルプランの追加が正常に完了しました！');
  } catch (error) {
    // エラーログを出力
    console.error('サンプルプラン追加エラー:', error);
    // エラーを再投げして呼び出し元でハンドリング可能にする
    throw error;
  }
};
