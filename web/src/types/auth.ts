export interface User {
  _id: string;
  email: string;
  name: string;
  picture?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
}
