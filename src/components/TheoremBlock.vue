<template>
  <div class="theorem-block">
    <div class="theorem-header" @click="toggle">
      <span class="theorem-icon">📐</span>
      <span class="theorem-name">{{ theorem.name }}</span>
      <span class="theorem-toggle">{{ isOpen ? '▲' : '▼' }}</span>
    </div>
    <div v-if="isOpen" class="theorem-body">
      <p class="theorem-statement-text">{{ theorem.statement_text }}</p>
      <div ref="mathEl" class="theorem-statement-math"></div>
      <div class="theorem-proof">
        <strong>Proof:</strong>
        <p>{{ theorem.proof }}</p>
      </div>
      <div v-if="theorem.cases" class="theorem-cases">
        <div v-for="c in theorem.cases" :key="c.name" class="theorem-case">
          <strong>{{ c.name }}:</strong> {{ c.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import katex from 'katex'

const props = defineProps({ theorem: Object })
const isOpen = ref(false)
const mathEl = ref(null)

const toggle = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await nextTick()
    if (mathEl.value && props.theorem.katex_statement) {
      try {
        katex.render(props.theorem.katex_statement, mathEl.value, {
          throwOnError: false,
          displayMode: true,
        })
      } catch (e) {
        mathEl.value.textContent = props.theorem.katex_statement
      }
    }
  }
}
</script>
