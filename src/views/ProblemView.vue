<template>
  <div class="problem-view" v-if="problem">
    <div class="problem-header">
      <router-link :to="'/chapter/' + chapter.id" class="back-link">
        ← Ch{{ chapter.id }}: {{ chapter.title }}
      </router-link>
      <h1>{{ problem.title }}</h1>
      <div class="problem-meta">
        <DifficultyBadge :difficulty="problem.difficulty" />
        <span class="complexity-badge">⏱ {{ problem.timeComplexity }}</span>
        <span class="complexity-badge">💾 {{ problem.spaceComplexity }}</span>
        <span v-for="tag in problem.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>

    <div class="problem-body">
      <div class="problem-description">
        <h3>Description</h3>
        <p>{{ problem.description }}</p>
      </div>

      <div class="problem-examples">
        <h3>Examples</h3>
        <div v-for="(ex, i) in problem.examples" :key="i" class="example-block">
          <div><strong>Input:</strong> <code>{{ ex.input }}</code></div>
          <div><strong>Output:</strong> <code>{{ ex.output }}</code></div>
          <div v-if="ex.explanation" class="example-explanation">{{ ex.explanation }}</div>
        </div>
      </div>

      <div class="problem-constraints">
        <h3>Constraints</h3>
        <ul>
          <li v-for="c in problem.constraints" :key="c">{{ c }}</li>
        </ul>
      </div>

      <div v-if="problem.hint" class="problem-hint">
        <details>
          <summary>💡 Hint</summary>
          <p>{{ problem.hint }}</p>
        </details>
      </div>

      <div class="problem-solutions">
        <h3>Solutions</h3>
        <CodeBlock :solutions="problem.solutions" />
      </div>
    </div>

    <div class="problem-nav">
      <router-link
        v-if="prevProblem"
        :to="'/chapter/' + chapter.id + '/problem/' + prevProblem.id"
        class="nav-btn"
      >← {{ prevProblem.title }}</router-link>
      <router-link
        v-if="nextProblem"
        :to="'/chapter/' + chapter.id + '/problem/' + nextProblem.id"
        class="nav-btn"
      >{{ nextProblem.title }} →</router-link>
    </div>
  </div>
  <div v-else class="not-found">Problem not found</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getChapter } from '../data/index.js'
import CodeBlock from '../components/CodeBlock.vue'
import DifficultyBadge from '../components/DifficultyBadge.vue'

const route = useRoute()
const chapter = computed(() => getChapter(Number(route.params.chapterId)))
const problem = computed(() =>
  chapter.value?.problems?.find(p => p.id === Number(route.params.problemId))
)
const prevProblem = computed(() => {
  const idx = chapter.value?.problems?.findIndex(p => p.id === Number(route.params.problemId))
  return idx > 0 ? chapter.value.problems[idx - 1] : null
})
const nextProblem = computed(() => {
  const idx = chapter.value?.problems?.findIndex(p => p.id === Number(route.params.problemId))
  return idx < chapter.value?.problems?.length - 1 ? chapter.value.problems[idx + 1] : null
})
</script>
