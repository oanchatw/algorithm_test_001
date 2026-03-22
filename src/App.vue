<template>
  <div class="app-layout">
    <button class="hamburger" @click="sidebarOpen = !sidebarOpen" :aria-label="sidebarOpen ? 'Close menu' : 'Open menu'">
      <span :class="['ham-icon', { open: sidebarOpen }]">
        <span></span><span></span><span></span>
      </span>
    </button>
    <transition name="fade-overlay">
      <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false" />
    </transition>
    <AppSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'

const sidebarOpen = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { sidebarOpen.value = false })
</script>
