const { defineComponent, ref, onMounted, watch } = Vue;

export default defineComponent({
  name: 'CodeBlock',
  props: { solutions: Object },
  setup(props) {
    const activeTab = ref('kotlin');
    const langs = ['kotlin', 'dart', 'swift', 'haskell'];

    const highlight = () => {
      // Use hljs to highlight all code blocks
      setTimeout(() => {
        document.querySelectorAll('pre code.hljs-pending').forEach(block => {
          hljs.highlightElement(block);
          block.classList.remove('hljs-pending');
        });
      }, 50);
    };

    onMounted(highlight);
    watch(activeTab, highlight);

    return { activeTab, langs };
  },
  template: `
    <div class="code-block">
      <div class="code-tabs">
        <button v-for="lang in langs" :key="lang"
          :class="['code-tab', { active: activeTab === lang }]"
          @click="activeTab = lang">
          {{ lang.charAt(0).toUpperCase() + lang.slice(1) }}
        </button>
      </div>
      <div class="code-content">
        <pre v-for="lang in langs" v-show="activeTab === lang" :key="lang">
          <code :class="['language-' + (lang === 'dart' ? 'javascript' : lang), 'hljs-pending']">{{ solutions[lang] }}</code>
        </pre>
      </div>
    </div>
  `
});
