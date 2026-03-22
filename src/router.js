import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ChapterView from './views/ChapterView.vue'
import ProblemView from './views/ProblemView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/chapter/:id', component: ChapterView },
  { path: '/chapter/:chapterId/problem/:problemId', component: ProblemView },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
