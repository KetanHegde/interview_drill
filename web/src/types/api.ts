import { Attempt } from "./drill";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface Stats {
  totalAttempts: number;
  averageScore: number;
  recentAttempts: Attempt[];
}
