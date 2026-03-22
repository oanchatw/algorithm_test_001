import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/algorithm_test_001/',   // GitHub Pages sub-path (must match repo name)
})
