import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/CreateQmanage',
      name: 'CreateQmanage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateQmanage.vue')
    },
    {
      path: '/QuestionaireSet',
      name: 'QuestionaireSet',
      component: () => import('../views/QuestionaireSet.vue')
    },
    {
      path:'/SetContent',
      name:'SetContet',
      component:() => import('../views/SetContent.vue')
      
    }
  ]
})

export default router
