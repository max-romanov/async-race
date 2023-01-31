import { createRouter, createWebHashHistory } from 'vue-router'
import Garage from '../views/Garage.vue'
import Winners from '../views/Winners.vue'
import notFoundPage from '../views/404.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'Garage',
      path: '/',
      component: Garage,
    },
    {
      name: 'Winners',
      path: '/winners',
      component: Winners,
    },
    {
      name: 'not found',
      path: '/:pathMatch(.*)*',
      component: notFoundPage,
    },
  ],
})

export default router
