<template>
    <div v-if="visible" class="dialog">
      <p>{{ message }}</p>
      <button @click="confirm(true)">Confirmar</button>
      <button @click="confirm(false)">Cancelar</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const visible = ref(false)
  const message = ref('')
  let resolveFn: (value: boolean) => void
  
  function openDialog(msg: string): Promise<boolean> {
    message.value = msg
    visible.value = true
    return new Promise((resolve) => {
      resolveFn = resolve
    })
  }
  
  function confirm(value: boolean) {
    visible.value = false
    resolveFn(value)
  }
  
  defineExpose({ openDialog })
  </script>
  
  <style scoped>
  .dialog {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>