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
      component: () => import('../views/CreateQmanage.vue'),
      meta:{
        breadCrum:[{
          name:"我的問卷",
          link:"/CreateQmanage",
        }],
      }
    },
    {
      path: '/QuestionaireSet',
      name: 'QuestionaireSet',
      component: () => import('../views/QuestionaireSet.vue'),
      meta:{
        breadCrum:[{
          name:"我的問卷",
          link:"/CreateQmanage",
        },
        {
          name:"建立問卷主題",
          // link:'/QuestionaireSet'
          
        }]
      }
    },
    {
      path:'/SetContent',
      name:'SetContet',
      component:() => import('../views/SetContent.vue'),
      meta:{
        breadCrum:[{
          name:"我的問卷",
          link:"/CreateQmanage",
        },
        {
          name:"建立問卷主題",
          link:'/QuestionaireSet'
        },
        {
          name:"題目設定",
          link:'/SetContent'
        }]
      }
    },
    {
      path:'/preview',
      name:'preview',
      component:() => import('../views/preview.vue'),
    }
  ]
})

export default router
