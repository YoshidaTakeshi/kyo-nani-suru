import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const createSampleData = async () => {
  const sampleLogId = 'sample-log-id';
  
  const sampleLog = {
    title: 'サンプル実行履歴',
    memo: 'これはサンプルのメモです。\n\n複数行のテキストを表示できます。',
    executionDate: Timestamp.fromDate(new Date(2024, 0, 15)), // January 15, 2024
    images: [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3',
    ],
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  };

  try {
    await setDoc(doc(db, 'logs', sampleLogId), sampleLog);
    console.log('Sample data created successfully');
  } catch (error) {
    console.error('Error creating sample data:', error);
  }
};