const { defineComponent, ref, onMounted, nextTick } = Vue;

export default defineComponent({
  name: 'TheoremBlock',
  props: { theorem: Object },
  setup(props) {
    const isOpen = ref(false);
    const proofRef = ref(null);

    const toggle = () => {
      isOpen.value = !isOpen.value;
      if (isOpen.value) {
        nextTick(() => {
          // Render KaTeX in the proof content
          if (window.katex && proofRef.value) {
            const el = proofRef.value.querySelector('.theorem-statement-math');
            if (el && props.theorem.katex_statement) {
              try {
                katex.render(props.theorem.katex_statement, el, { throwOnError: false, displayMode: true });
              } catch(e) {}
            }
          }
        });
      }
    };

    return { isOpen, toggle, proofRef };
  },
  template: `
    <div class="theorem-block">
      <div class="theorem-header" @click="toggle">
        <span class="theorem-icon">📐</span>
        <span class="theorem-name">{{ theorem.name }}</span>
        <span class="theorem-toggle">{{ isOpen ? '▲' : '▼' }}</span>
      </div>
      <div v-if="isOpen" class="theorem-body" ref="proofRef">
        <p class="theorem-statement-text">{{ theorem.statement_text }}</p>
        <div class="theorem-statement-math"></div>
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
  `
});
