import api from './api';
import type { MtNetwork } from '../types/mtNetwork';

export default {
  getBySubstationId: async (substationId: number): Promise<MtNetwork[]> => {
    const response = await api.get(`/subestacoes/${substationId}/networks`);
    return response.data;
  },
  
  create: async (substationId: number, mtNetwork: MtNetwork): Promise<MtNetwork> => {
    const response = await api.post(`/subestacoes/${substationId}/networks`, mtNetwork);
    return response.data;
  },
  
  update: async (id: number, mtNetwork: MtNetwork): Promise<MtNetwork> => {
    const response = await api.put(`/networks/${id}`, mtNetwork);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/networks/${id}`);
  }
};