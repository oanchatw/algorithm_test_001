const { defineComponent, computed, ref } = Vue;
import { chapters } from '../data/index.js';

export default defineComponent({
  name: 'AppSidebar',
  setup() {
    const route = VueRouter.useRoute();
    const isCollapsed = ref(false);
    const year1 = computed(() => chapters.filter(c => c.year === 1));
    const year2 = computed(() => chapters.filter(c => c.year === 2));

    const isActive = (id) => route.params.id === String(id) || route.params.chapterId === String(id);

    return { year1, year2, isActive, isCollapsed };
  },
  template: `
    <aside :class="['sidebar', { collapsed: isCollapsed }]">
      <div class="sidebar-header">
        <router-link to="/" class="sidebar-logo">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">AlgoMaster</span>
        </router-link>
        <button class="sidebar-toggle" @click="isCollapsed = !isCollapsed">☰</button>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/" class="sidebar-home">🏠 Home</router-link>

        <div class="sidebar-year">
          <span class="sidebar-year-label">Year 1 — Foundations</span>
          <router-link v-for="ch in year1" :key="ch.id"
            :to="'/chapter/' + ch.id"
            :class="['sidebar-item', { active: isActive(ch.id) }]">
            <span class="sidebar-item-icon">{{ ch.icon }}</span>
            <span class="sidebar-item-text">Ch{{ ch.id }}. {{ ch.title }}</span>
          </router-link>
        </div>

        <div class="sidebar-year">
          <span class="sidebar-year-label">Year 2 — Advanced</span>
          <router-link v-for="ch in year2" :key="ch.id"
            :to="'/chapter/' + ch.id"
            :class="['sidebar-item', { active: isActive(ch.id) }]">
            <span class="sidebar-item-icon">{{ ch.icon }}</span>
            <span class="sidebar-item-text">Ch{{ ch.id }}. {{ ch.title }}</span>
          </router-link>
        </div>
      </nav>
    </aside>
  `
});
