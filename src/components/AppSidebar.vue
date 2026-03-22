<template>
  <aside :class="['sidebar', { 'sidebar--open': isOpen }]">
    <div class="sidebar-header">
      <router-link to="/" class="sidebar-logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">AlgoMaster</span>
      </router-link>
    </div>
    <nav class="sidebar-nav">
      <router-link to="/" class="sidebar-home" @click="$emit('close')">🏠 Home</router-link>
      <div class="sidebar-section">
        <span class="sidebar-year-label">📚 Year 1 — Foundations</span>
        <router-link
          v-for="ch in year1" :key="ch.id"
          :to="'/chapter/' + ch.id"
          :class="['sidebar-item', { active: isActive(ch.id) }]"
          @click="$emit('close')"
        >
          <span class="sidebar-item-icon">{{ ch.icon }}</span>
          <span class="sidebar-item-text">Ch{{ ch.id }}. {{ ch.title }}</span>
        </router-link>
      </div>
      <div class="sidebar-section">
        <span class="sidebar-year-label">🎓 Year 2 — Advanced</span>
        <router-link
          v-for="ch in year2" :key="ch.id"
          :to="'/chapter/' + ch.id"
          :class="['sidebar-item', { active: isActive(ch.id) }]"
          @click="$emit('close')"
        >
          <span class="sidebar-item-icon">{{ ch.icon }}</span>
          <span class="sidebar-item-text">Ch{{ ch.id }}. {{ ch.title }}</span>
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { chapters } from '../data/index.js'

const props = defineProps({ isOpen: Boolean })
defineEmits(['close'])

const route = useRoute()
const year1 = computed(() => chapters.filter(c => c.year === 1))
const year2 = computed(() => chapters.filter(c => c.year === 2))
const isActive = (id) =>
  route.params.id === String(id) || route.params.chapterId === String(id)
</script>
