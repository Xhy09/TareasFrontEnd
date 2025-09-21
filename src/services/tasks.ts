import { api } from './api';
import { Task } from '../types';

export const tasksService = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getById: async (id: number): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (data: { title: string; description?: string }): Promise<Task> => {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Task>): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};