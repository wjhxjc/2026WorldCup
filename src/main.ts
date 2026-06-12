import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/HomeView.vue')
  },
  {
    path: '/teams',
    name: 'Teams',
    component: () => import('./views/TeamsView.vue')
  },
  {
    path: '/teams/:id',
    name: 'TeamDetail',
    component: () => import('./views/TeamDetailView.vue')
  },
  {
    path: '/compare',
    name: 'Compare',
    component: () => import('./views/CompareView.vue')
  },
  {
    path: '/bracket',
    name: 'Bracket',
    component: () => import('./views/BracketView.vue')
  },
  {
    path: '/vote',
    name: 'Vote',
    component: () => import('./views/VoteView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
