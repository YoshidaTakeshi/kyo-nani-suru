import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const samplePlans = [
  {
    title: '近所の公園を散歩する',
    description: '新鮮な空気を吸いながら、のんびりと公園を歩いてリフレッシュしましょう。',
    category: '運動・健康',
    difficulty: '簡単'
  },
  {
    title: '新しいレシピに挑戦する',
    description: 'いつもと違う料理を作ってみて、新しい味を発見しましょう。',
    category: '料理・グルメ',
    difficulty: '普通'
  },
  {
    title: '本を一冊読む',
    description: '興味のある本を選んで、知識を深めたり物語の世界に浸りましょう。',
    category: '学習・読書',
    difficulty: '普通'
  },
  {
    title: '写真を撮りに出かける',
    description: '身近な風景や面白いものを見つけて写真に収めてみましょう。',
    category: '趣味・創作',
    difficulty: '簡単'
  },
  {
    title: '友人に連絡を取る',
    description: 'しばらく連絡していない友人に電話やメッセージを送ってみましょう。',
    category: '人間関係',
    difficulty: '簡単'
  }
];

export const addSamplePlans = async () => {
  try {
    const plansRef = collection(db, 'plans');
    
    for (const plan of samplePlans) {
      await addDoc(plansRef, plan);
      console.log('Added plan:', plan.title);
    }
    
    console.log('All sample plans added successfully!');
  } catch (error) {
    console.error('Error adding sample plans:', error);
  }
};