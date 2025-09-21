export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}