const { defineComponent, h } = Vue;

export default defineComponent({
  name: 'DifficultyBadge',
  props: { difficulty: String },
  setup(props) {
    return () => h('span', {
      class: `badge badge-${props.difficulty}`
    }, props.difficulty?.toUpperCase())
  }
});
