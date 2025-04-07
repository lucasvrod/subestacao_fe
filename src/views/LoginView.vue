<template>
    <div class="login-container" :style="{ backgroundImage: `url(${bgImage})` }">
      <div class="header">
        <h1>Sistema Teste Desenvolvedor Java - Versão 1.5</h1>
      </div>
      
      <div class="login-box">
        <div class="form-group">
          <label for="username">Usuário:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        
        <button class="btn-login" @click="login">entrar</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import bgImage from '../assets/images/electric-grid.jpg';
  
  const username = ref('');
  const password = ref('');
  const router = useRouter();
  
  const login = () => {
    // Neste teste, não é necessária autenticação real
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/list');
  };
  </script>
  
  <style scoped>
  .login-container {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  
  .header {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .header h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }
  
  .login-box {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 5px;
    padding: 2rem;
    width: 300px;
    margin: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .btn-login {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    border-radius: 3px;
    cursor: pointer;
    float: right;
  }
  
  .btn-login:hover {
    background-color: #e0e0e0;
  }
  </style>