import { createApp } from 'vue'
import router from './router.js'
import App from './App.vue'

// KaTeX CSS
import 'katex/dist/katex.min.css'
// Highlight.js dark theme
import 'highlight.js/styles/atom-one-dark.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
