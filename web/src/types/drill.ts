export interface Question {
  id: string;
  prompt: string;
  keywords: string[];
}

export interface Drill {
  _id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  questions: Question[];
}

export interface Answer {
  qid: string;
  text: string;
}

export interface Attempt {
  _id: string;
  userId: string;
  drillId: string | Drill;
  answers: Answer[];
  score: number;
  createdAt: string;
}
