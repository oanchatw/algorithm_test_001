const { createApp } = Vue;
import router from './router.js';
import AppSidebar from './components/AppSidebar.js';

const App = {
  components: { AppSidebar },
  template: `
    <div class="app-layout">
      <AppSidebar />
      <main class="app-main">
        <router-view />
      </main>
    </div>
  `
};

const app = createApp(App);
app.use(router);
app.mount('#app');
