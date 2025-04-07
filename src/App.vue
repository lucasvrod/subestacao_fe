<template>
  <div class="app-container">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #f0f0f0;
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #ddd;

  h1 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
  }
}

main {
  flex: 1;
  padding: 1rem;
}

// Estilos comuns para toda a aplicação
.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  
  li {
    margin-right: 0.5rem;
    
    &:not(:last-child):after {
      content: '/';
      margin-left: 0.5rem;
      color: #999;
    }
    
    a {
      color: #0078d7;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.panel {
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.panel-title {
  font-weight: bold;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
}

.btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #f5f5f5;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  &:active {
    background-color: #d0d0d0;
  }
}

.table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  
  tr:hover {
    background-color: #f9f9f9;
  }
}

.action-link {
  color: #0078d7;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
}
</style>