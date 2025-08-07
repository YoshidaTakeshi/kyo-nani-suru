# LogCreateScreen Documentation

## Overview
The LogCreateScreen allows users to create execution logs with multiple photos and memo text. It integrates with Firebase Storage for image uploads and Firestore for data persistence.

## Features

### Image Selection
- **Multiple Selection**: Users can select up to 10 images at once
- **Image Preview**: Selected images are displayed in a horizontal scrollable list
- **Remove Images**: Each image has a remove button (×) to delete from selection
- **Quality Optimization**: Images are compressed to 0.8 quality for optimal upload

### Data Storage
- **Firebase Storage**: Images are uploaded to `logs/[timestamp]_[filename]` path
- **Firestore Collection**: Log data is saved to `logs` collection

### Firestore Document Structure
```typescript
{
  planId: string,           // The plan this log belongs to
  timestamp: Timestamp,     // Firebase server timestamp
  imageUrls: string[],      // Array of Storage download URLs
  memo: string,             // User's memo text
  createdAt: Date          // Local creation timestamp
}
```

## Usage

### Basic Implementation
```typescript
import LogCreateScreen from './screens/LogCreateScreen';

// Use with a specific plan ID
<LogCreateScreen planId="your-plan-id" />

// Use with default test plan ID
<LogCreateScreen />
```

### Props
- `planId` (optional): The ID of the plan this log belongs to. Defaults to "test-plan"

## User Workflow

1. **Select Images**: Tap "写真を選択" button to open image picker
2. **Preview Images**: Selected images appear in horizontal scroll view
3. **Remove Images**: Tap × button on any image to remove it
4. **Add Memo**: Enter optional memo text
5. **Save Log**: Tap "ログを保存" to upload images and save data

## Error Handling

- **Permissions**: Requests camera roll access permissions
- **Validation**: Requires at least 1 image before saving
- **Upload Errors**: Shows error alerts for upload failures
- **Save Errors**: Shows error alerts for Firestore save failures

## UI States

- **Loading**: Shows activity indicator and "保存中..." during upload
- **Success**: Shows success alert and resets form
- **Error**: Shows error alerts with descriptive messages

## Dependencies

- `expo-image-picker`: For image selection
- `firebase/storage`: For image uploads
- `firebase/firestore`: For data persistence
- `react-native`: For UI components

## Security Notes

- Images are uploaded to Firebase Storage with public read access
- Firestore security rules should be configured appropriately
- Anonymous authentication is used (as configured in App.js)