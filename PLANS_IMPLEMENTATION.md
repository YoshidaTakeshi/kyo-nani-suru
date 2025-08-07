# Plans Collection Implementation

This implementation provides functionality to manage and retrieve random plans from a Firestore collection.

## Files Created

### `lib/plan.ts`
- Defines the `Plan` interface with required fields: id, title, category, level, estimatedTime
- Implements `fetchRandomPlan()` function that retrieves a random plan from Firestore
- Includes comprehensive error handling

### `lib/seedPlans.ts`
- Contains sample data with 10 diverse plans across multiple categories
- Implements `seedPlansCollection()` function to populate the Firestore collection
- Plans include various activities like exercise, learning, lifestyle, entertainment, etc.

## Usage

### Seeding the Collection
```typescript
import { seedPlansCollection } from './lib/seedPlans';

// Call once to populate the collection with sample data
await seedPlansCollection();
```

### Fetching a Random Plan
```typescript
import { fetchRandomPlan } from './lib/plan';

// Get a random plan
const plan = await fetchRandomPlan();
if (plan) {
  console.log(`Today's activity: ${plan.title}`);
  console.log(`Category: ${plan.category}, Level: ${plan.level}, Time: ${plan.estimatedTime} minutes`);
} else {
  console.log('No plans available - seed the collection first');
}
```

## Data Structure

Each plan contains:
- `id`: Unique identifier (string)
- `title`: Activity name (string)
- `category`: Type of activity (運動, 学習, 生活, 娯楽, 社交, 趣味)
- `level`: Difficulty level (1-3, where 1 is easiest)
- `estimatedTime`: Expected duration in minutes (number)

## Error Handling

Both functions include proper error handling:
- `fetchRandomPlan()` returns null if no plans exist and throws errors for Firestore issues
- `seedPlansCollection()` throws descriptive errors if seeding fails
- All errors are logged to console for debugging

## Firebase Requirements

Make sure your Firestore security rules allow read/write access to the `plans` collection based on your authentication setup.