import { api } from './api';
import { LoginData, RegisterData } from '../types';

export const authService = {
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};