// Types for the application

export interface LogEntry {
  id: string;
  title: string;
  memo?: string;
  executionDate: Date;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LogDetailScreenParams {
  logId: string;
}