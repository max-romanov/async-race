import { createRouter, createWebHistory } from 'vue-router'
import Garage from '../views/Garage.vue'
import Winners from '../views/Winners.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Garage',
      path: '/garage',
      component: Garage,
    },
    {
      name: 'winners',
      path: '/winners',
      component: Winners,
    },
  ],
})

export default router
