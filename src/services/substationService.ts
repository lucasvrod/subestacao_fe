import api from './api';
import type { Substation } from '../types/substation';

export default {
  getAll: async (): Promise<Substation[]> => {
    const response = await api.get('/subestacoes');
    return response.data;
  },
  
  getById: async (id: number): Promise<Substation> => {
    const response = await api.get(`/subestacoes/${id}`);
    return response.data;
  },
  
  create: async (substation: Substation): Promise<Substation> => {
    const response = await api.post('/subestacoes', substation);
    return response.data;
  },
  
  update: async (id: number, substation: Substation): Promise<Substation> => {
    const response = await api.put(`/subestacoes/${id}`, substation);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/subestacoes/${id}`);
  }
};