<template>
  <div class="code-block">
    <div class="code-tabs">
      <button
        v-for="lang in langs" :key="lang"
        :class="['code-tab', { active: activeTab === lang }]"
        @click="activeTab = lang"
      >
        {{ lang.charAt(0).toUpperCase() + lang.slice(1) }}
      </button>
    </div>
    <div class="code-content">
      <pre v-for="lang in langs" v-show="activeTab === lang" :key="lang"><code
        :ref="el => { if (el) codeRefs[lang] = el }"
        :class="'language-' + lang"
      >{{ solutions[lang] }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import hljs from 'highlight.js/lib/core'
import kotlin from 'highlight.js/lib/languages/kotlin'
import dart from 'highlight.js/lib/languages/dart'
import swift from 'highlight.js/lib/languages/swift'
import haskell from 'highlight.js/lib/languages/haskell'

hljs.registerLanguage('kotlin', kotlin)
hljs.registerLanguage('dart', dart)
hljs.registerLanguage('swift', swift)
hljs.registerLanguage('haskell', haskell)

const props = defineProps({ solutions: Object })

const activeTab = ref('kotlin')
const langs = ['kotlin', 'dart', 'swift', 'haskell']
const codeRefs = ref({})

const highlight = async () => {
  await nextTick()
  Object.values(codeRefs.value).forEach(el => {
    if (el && !el.dataset.highlighted) {
      hljs.highlightElement(el)
    }
  })
}

onMounted(highlight)
</script>
