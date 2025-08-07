import { collection, addDoc } from 'firebase/firestore';
import { db } from '../src/firebase';
import { Plan } from './plan';

/**
 * Sample plans data to seed the Firestore collection
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
 * Seeds the Firestore plans collection with sample data
 * This function should be called once to populate the collection
 */
export async function seedPlansCollection(): Promise<void> {
  try {
    const plansCollection = collection(db, 'plans');
    
    console.log('Starting to seed plans collection...');
    
    for (const plan of samplePlans) {
      await addDoc(plansCollection, plan);
      console.log(`Added plan: ${plan.title}`);
    }
    
    console.log(`Successfully seeded ${samplePlans.length} plans to Firestore`);
  } catch (error) {
    console.error('Error seeding plans collection:', error);
    throw new Error(`Failed to seed plans collection: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}