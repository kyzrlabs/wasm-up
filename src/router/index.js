import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {useWasmStore} from "@/stores/wasm.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/recipe-catalog',
      name: 'recipe-catalog',
      component: () => import('../views/RecipeCatalog.vue')
    },
    {
      path: '/recipe/:id',
      name: 'recipe-item',
      component: () => import('../views/Recipe.vue')
    },
    {
      path: '/stock-catalog',
      name: 'stock-catalog',
      component: () => import('../views/StockCatalog.vue')
    },
    {
      path: '/item/:id',
      name: 'stock-item',
      component: () => import('../views/StockItem.vue')
    }
  ]
})

export default router
