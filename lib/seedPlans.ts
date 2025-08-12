import { collection, addDoc } from 'firebase/firestore';
import { db } from '../src/firebase';
import { Plan } from './plan';

/**
 * Firestoreコレクションに初期データとして追加するサンプルプランデータ
 */
const samplePlans: Omit<Plan, 'id'>[] = [
  {
    title: '散歩をする',
    category: '運動',
    level: 1,
    estimatedTime: 30,
  },
  {
    title: '読書をする',
    category: '学習',
    level: 2,
    estimatedTime: 60,
  },
  {
    title: '料理を作る',
    category: '生活',
    level: 3,
    estimatedTime: 90,
  },
  {
    title: 'ヨガをする',
    category: '運動',
    level: 2,
    estimatedTime: 45,
  },
  {
    title: '映画を見る',
    category: '娯楽',
    level: 1,
    estimatedTime: 120,
  },
  {
    title: '友人に連絡する',
    category: '社交',
    level: 1,
    estimatedTime: 15,
  },
  {
    title: '部屋を片付ける',
    category: '生活',
    level: 2,
    estimatedTime: 60,
  },
  {
    title: '新しいレシピを試す',
    category: '生活',
    level: 3,
    estimatedTime: 120,
  },
  {
    title: '楽器を練習する',
    category: '趣味',
    level: 3,
    estimatedTime: 60,
  },
  {
    title: '日記を書く',
    category: '学習',
    level: 1,
    estimatedTime: 20,
  },
];

/**
 * Firestoreのプランコレクションにサンプルデータを追加する関数
 * コレクションを初期化するために一度だけ実行する必要がある
 * @returns Promise<void>
 */
export async function seedPlansCollection(): Promise<void> {
  try {
    const plansCollection = collection(db, 'plans');

    console.log('プランコレクションの初期化を開始します...');

    for (const plan of samplePlans) {
      await addDoc(plansCollection, plan);
      console.log(`プランを追加しました: ${plan.title}`);
    }

    console.log(
      `${samplePlans.length}件のプランをFirestoreに正常に追加しました`
    );
  } catch (error) {
    console.error('プランコレクション初期化エラー:', error);
    throw new Error(
      `プランコレクションの初期化に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`
    );
  }
}
