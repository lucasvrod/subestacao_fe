<template>
    <div class="list-container">
      <div class="header">
        <h1>Sistema Teste Desenvolvedor Java - Versão 1.5</h1>
      </div>
  
      <div class="content">
        <h2>Subestações</h2>
        
        <div class="table-container">
          <table class="substations-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>excluir</th>
                <th>alterar</th>
                <th>exibir no mapa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="substation in substations" :key="substation.code">
                <td>{{ substation.codigo }}</td>
                <td>{{ substation.nome }}</td>
                <td class="action-link">
                  <a href="#" @click.prevent="confirmDelete(substation)">excluir</a>
                </td>
                <td class="action-icon">
                  <img src="../assets/images/edit-icon.png" alt="Editar" @click="editSubstation(substation)" />
                </td>
                <td class="action-icon">
                  <img src="../assets/images/map-icon.png" alt="Mapa" @click="showOnMap(substation)" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="actions">
          <button class="btn-add" @click="addSubstation">incluir</button>
        </div>
      </div>
      
      <!-- Diálogo de confirmação -->
      <div class="confirm-dialog" v-if="showConfirmDialog">
        <div class="dialog-content">
          <p>Tem certeza que deseja excluir esta subestação e suas respectivas Redes MT?</p>
          <div class="dialog-buttons">
            <button @click="confirmDeleteAction">Sim</button>
            <button @click="cancelDelete">Não</button>
          </div>
        </div>
      </div>
      
      <!-- Toast de notificação -->
      <div class="toast" v-if="toast.show" :class="toast.type">
        {{ toast.message }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSubstationStore } from '../stores/substationStore';
  import type { Substation } from '../types/substation';
  
  const router = useRouter();
  const substationStore = useSubstationStore();
  const substations = ref<Substation[]>([]);
  const showConfirmDialog = ref(false);
  const substationToDelete = ref<Substation | null>(null);
  
  const toast = ref({
    show: false,
    message: '',
    type: 'success'
  });
  
  // Carregar subestações ao montar o componente
  onMounted(async () => {
    try {
      await substationStore.fetchSubstations();
      substations.value = substationStore.substations;
    } catch (error) {
      showToast('Erro ao carregar subestações', 'error');
    }
  });
  
  const addSubstation = () => {
    router.push('/create');
  };
  
  const editSubstation = (substation: Substation) => {
    if (substation.id) {
      router.push(`/edit/${substation.id}`);
    }
  };
  
  const showOnMap = (substation: Substation) => {
    if (substation.id) {
      router.push(`/map/${substation.id}`);
    }
  };
  
  const confirmDelete = (substation: Substation) => {
    substationToDelete.value = substation;
    showConfirmDialog.value = true;
  };
  
  const confirmDeleteAction = async () => {
    if (substationToDelete.value && substationToDelete.value.id) {
      try {
        await substationStore.deleteSubstation(substationToDelete.value.id);
        substations.value = substationStore.substations;
        showToast('Subestação excluída com sucesso', 'success');
      } catch (error) {
        showToast('Erro ao excluir subestação', 'error');
      }
    }
    showConfirmDialog.value = false;
  };
  
  const cancelDelete = () => {
    showConfirmDialog.value = false;
    substationToDelete.value = null;
  };
  
  const showToast = (message: string, type: 'success' | 'error') => {
    toast.value = {
      show: true,
      message,
      type
    };
    
    setTimeout(() => {
      toast.value.show = false;
    }, 3000);
  };
  </script>
  
  <style scoped>
  .list-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .header {
    background-color: #f0f0f0;
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  
  .header h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }
  
  .content {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  
  h2 {
    margin-top: 0;
  }
  
  .table-container {
    margin-bottom: 1rem;
    overflow-x: auto;
  }
  
  .substations-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .substations-table th, 
  .substations-table td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: center;
  }
  
  .substations-table th {
    background-color: #f0f0f0;
  }
  
  .action-link a {
    color: blue;
    text-decoration: none;
  }
  
  .action-icon img {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  
  .actions {
    text-align: right;
    margin-top: 1rem;
  }
  
  .btn-add {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .btn-add:hover {
    background-color: #e0e0e0;
  }
  
  /* Diálogo de confirmação */
  .confirm-dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .dialog-content {
    background-color: white;
    padding: 2rem;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
  }
  
  .dialog-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .dialog-buttons button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #f0f0f0;
    cursor: pointer;
  }
  
  .dialog-buttons button:hover {
    background-color: #e0e0e0;
  }
  
  /* Toast */
  .toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 1rem;
    border-radius: 5px;
    z-index: 1000;
    animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
  }
  
  .toast.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  .toast.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  </style>