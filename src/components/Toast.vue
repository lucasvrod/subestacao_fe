<template>
    <div v-if="visible" class="toast">{{ message }}</div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const visible = ref(false)
  const message = ref('')
  
  function showToast(msg: string, duration = 3000) {
    message.value = msg
    visible.value = true
    setTimeout(() => visible.value = false, duration)
  }
  
  defineExpose({ showToast })
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
  }
  </style>