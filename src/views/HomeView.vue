<template>
  <div class="home-view">
    <div class="hero">
      <h1>Algorithm Mastery</h1>
      <p>Two complete academic years of algorithms, proofs, and implementations in Kotlin, Dart, Swift &amp; Haskell</p>
      <div class="hero-stats">
        <div class="stat"><span class="stat-num">20</span><span class="stat-label">Chapters</span></div>
        <div class="stat"><span class="stat-num">400+</span><span class="stat-label">Problems</span></div>
        <div class="stat"><span class="stat-num">4</span><span class="stat-label">Languages</span></div>
        <div class="stat"><span class="stat-num">50+</span><span class="stat-label">Theorems</span></div>
      </div>
    </div>

    <section class="year-section">
      <h2 class="year-title">📚 Year 1 — Foundations</h2>
      <div class="chapter-grid">
        <router-link
          v-for="ch in year1" :key="ch.id"
          :to="'/chapter/' + ch.id"
          class="chapter-card"
        >
          <div class="chapter-card-icon" :style="{ background: ch.color + '22', borderColor: ch.color }">
            {{ ch.icon }}
          </div>
          <div class="chapter-card-body">
            <h3>Ch{{ ch.id }}. {{ ch.title }}</h3>
            <p>{{ ch.subtitle }}</p>
            <div class="chapter-card-meta">
              <span>{{ ch.problems?.length || 0 }} problems</span>
              <span>{{ ch.theorems?.length || 0 }} theorems</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <section class="year-section">
      <h2 class="year-title">🎓 Year 2 — Advanced</h2>
      <div class="chapter-grid">
        <router-link
          v-for="ch in year2" :key="ch.id"
          :to="'/chapter/' + ch.id"
          class="chapter-card"
        >
          <div class="chapter-card-icon" :style="{ background: ch.color + '22', borderColor: ch.color }">
            {{ ch.icon }}
          </div>
          <div class="chapter-card-body">
            <h3>Ch{{ ch.id }}. {{ ch.title }}</h3>
            <p>{{ ch.subtitle }}</p>
            <div class="chapter-card-meta">
              <span>{{ ch.problems?.length || 0 }} problems</span>
              <span>{{ ch.theorems?.length || 0 }} theorems</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { chapters } from '../data/index.js'

const year1 = computed(() => chapters.filter(c => c.year === 1))
const year2 = computed(() => chapters.filter(c => c.year === 2))
</script>
