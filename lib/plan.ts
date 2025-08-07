import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../src/firebase';

/**
 * Plan data structure for the plans collection
 */
export interface Plan {
  id: string;
  title: string;
  category: string;
  level: number;
  estimatedTime: number; // in minutes
}

/**
 * Fetches a random plan from the Firestore plans collection
 * @returns Promise<Plan | null> - Returns a random plan or null if no plans exist
 */
export async function fetchRandomPlan(): Promise<Plan | null> {
  try {
    // Get reference to plans collection
    const plansCollection = collection(db, 'plans');
    const plansQuery = query(plansCollection);
    
    // Fetch all plans from Firestore
    const querySnapshot = await getDocs(plansQuery);
    
    // Check if any plans exist
    if (querySnapshot.empty) {
      console.warn('No plans found in the collection');
      return null;
    }
    
    // Convert documents to Plan objects
    const plans: Plan[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      plans.push({
        id: doc.id,
        title: data.title,
        category: data.category,
        level: data.level,
        estimatedTime: data.estimatedTime,
      });
    });
    
    // Return a random plan
    const randomIndex = Math.floor(Math.random() * plans.length);
    return plans[randomIndex];
    
  } catch (error) {
    console.error('Error fetching random plan:', error);
    throw new Error(`Failed to fetch random plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}