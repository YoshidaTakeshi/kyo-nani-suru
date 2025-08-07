export interface Log {
  id: string;
  title: string;
  imageUrl?: string;
  createdAt: Date;
  description?: string;
}

export interface LogData {
  title: string;
  imageUrl?: string;
  createdAt: any; // Firestore Timestamp
  description?: string;
}