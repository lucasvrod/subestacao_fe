import { defineStore } from 'pinia';
import substationService from '../services/substationService';
import mtNetworkService from '../services/mtNetworkService';
import type { Substation } from '../types/substation';
import type { MtNetwork } from '../types/mtNetwork';

export const useSubstationStore = defineStore('substation', {
  state: () => ({
    substations: [] as Substation[],
    currentSubstation: null as Substation | null,
    loading: false,
    error: null as string | null
  }),
  
  actions: {
    async fetchSubstations() {
      this.loading = true;
      try {
        this.substations = await substationService.getAll();
        this.error = null;
      } catch (error) {
        this.error = 'Erro ao carregar subestações';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchSubstationById(id: number) {
      this.loading = true;
      try {
        this.currentSubstation = await substationService.getById(id);
        this.error = null;
      } catch (error) {
        this.error = 'Erro ao carregar subestação';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    
    async createSubstation(substation: Substation) {
      this.loading = true;
      try {
        const newSubstation = await substationService.create(substation);
        this.substations.push(newSubstation);
        this.error = null;
        return newSubstation;
      } catch (error) {
        this.error = 'Erro ao criar subestação';
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async updateSubstation(id: number, substation: Substation) {
      this.loading = true;
      try {
        const updatedSubstation = await substationService.update(id, substation);
        const index = this.substations.findIndex(s => s.id === id);
        if (index !== -1) {
          this.substations[index] = updatedSubstation;
        }
        this.error = null;
        return updatedSubstation;
      } catch (error) {
        this.error = 'Erro ao atualizar subestação';
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async deleteSubstation(id: number) {
      this.loading = true;
      try {
        await substationService.delete(id);
        this.substations = this.substations.filter(s => s.id !== id);
        this.error = null;
      } catch (error) {
        this.error = 'Erro ao excluir subestação';
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async addMtNetworkToSubstation(substationId: number, mtNetwork: MtNetwork) {
      try {
        const newNetwork = await mtNetworkService.create(substationId, mtNetwork);
        if (this.currentSubstation && this.currentSubstation.id === substationId) {
          if (!this.currentSubstation.mtNetworks) {
            this.currentSubstation.mtNetworks = [];
          }
          this.currentSubstation.mtNetworks.push(newNetwork);
        }
        return newNetwork;
      } catch (error) {
        this.error = 'Erro ao adicionar rede MT';
        console.error(error);
        throw error;
      }
    },
    
    async updateMtNetwork(id: number, mtNetwork: MtNetwork) {
      try {
        const updatedNetwork = await mtNetworkService.update(id, mtNetwork);
        if (this.currentSubstation && this.currentSubstation.mtNetworks) {
          const index = this.currentSubstation.mtNetworks.findIndex(n => n.id === id);
          if (index !== -1) {
            this.currentSubstation.mtNetworks[index] = updatedNetwork;
          }
        }
        return updatedNetwork;
      } catch (error) {
        this.error = 'Erro ao atualizar rede MT';
        console.error(error);
        throw error;
      }
    },
    
    async deleteMtNetwork(id: number) {
      try {
        await mtNetworkService.delete(id);
        if (this.currentSubstation && this.currentSubstation.mtNetworks) {
          this.currentSubstation.mtNetworks = this.currentSubstation.mtNetworks.filter(n => n.id !== id);
        }
      } catch (error) {
        this.error = 'Erro ao excluir rede MT';
        console.error(error);
        throw error;
      }
    }
  }
});