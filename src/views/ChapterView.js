const { defineComponent, computed } = Vue;
import { getChapter } from '../data/index.js';
import TheoremBlock from '../components/TheoremBlock.js';

export default defineComponent({
  name: 'ChapterView',
  components: { TheoremBlock },
  setup() {
    const route = VueRouter.useRoute();
    const chapter = computed(() => getChapter(Number(route.params.id)));

    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    const problems = computed(() => chapter.value?.problems || []);

    return { chapter, problems };
  },
  template: `
    <div class="chapter-view" v-if="chapter">
      <div class="chapter-header" :style="{ borderColor: chapter.color }">
        <span class="chapter-icon">{{ chapter.icon }}</span>
        <div>
          <h1>Chapter {{ chapter.id }}: {{ chapter.title }}</h1>
          <p class="chapter-subtitle">{{ chapter.subtitle }}</p>
          <p class="chapter-desc">{{ chapter.description }}</p>
        </div>
      </div>

      <section v-if="chapter.theorems?.length" class="theorems-section">
        <h2>📐 Theorems & Proofs</h2>
        <TheoremBlock v-for="t in chapter.theorems" :key="t.name" :theorem="t" />
      </section>

      <section class="problems-section">
        <h2>🔢 Problems ({{ problems.length }})</h2>
        <div class="problems-list">
          <router-link v-for="p in problems" :key="p.id"
            :to="'/chapter/' + chapter.id + '/problem/' + p.id"
            class="problem-row">
            <span class="problem-num">#{{ p.id }}</span>
            <span class="problem-title">{{ p.title }}</span>
            <div class="problem-tags">
              <span v-for="tag in p.tags?.slice(0,3)" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <span :class="['badge', 'badge-' + p.difficulty]">{{ p.difficulty }}</span>
            <span class="problem-complexity">{{ p.timeComplexity }}</span>
          </router-link>
        </div>
      </section>
    </div>
    <div v-else class="not-found">Chapter not found</div>
  `
});
