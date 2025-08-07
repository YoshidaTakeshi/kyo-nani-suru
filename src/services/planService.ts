import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export interface Plan {
  id: string;
  title: string;
  description?: string;
  category?: string;
  difficulty?: string;
}

export const fetchRandomPlan = async (): Promise<Plan> => {
  try {
    // Get all plans from Firestore
    const plansRef = collection(db, 'plans');
    const q = query(plansRef, limit(50)); // Limit to prevent fetching too many
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('No plans found in database');
    }
    
    // Convert to array and pick random
    const plans: Plan[] = [];
    querySnapshot.forEach((doc) => {
      plans.push({
        id: doc.id,
        ...doc.data()
      } as Plan);
    });
    
    const randomIndex = Math.floor(Math.random() * plans.length);
    return plans[randomIndex];
  } catch (error) {
    console.error('Error fetching random plan:', error);
    throw error;
  }
};