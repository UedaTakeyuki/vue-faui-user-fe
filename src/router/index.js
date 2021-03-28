import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import AccountRoutes  from '@/views/account/account.route.js'
import Purchase from '@/views/purchase/purchase.route.js'

//import AccountFront from '@/views/account/AccountFront.vue'

//import ga from 'vue-ga'

Vue.use(VueRouter)

const routes = [
  // home
  {
    path: '/',
    name: 'home',
    component: Home
  },


  // purchase
  ...Purchase.routes,

  // account
  ...AccountRoutes.routes,

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//ga(router, 'UA-xxxxxxxx-6')

export default router
