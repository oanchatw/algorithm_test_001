<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppSidebar from './components/AppSidebar.vue'
</script>
