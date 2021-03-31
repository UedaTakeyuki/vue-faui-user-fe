import PurchaseFront from '@/views/purchase/PurchaseFront.vue'
import PurchaseBind from '@/views/purchase/PurchaseBind.vue'
import PurchaseSucceeded from '@/views/purchase/PurchaseSucceeded.vue'
import Payments from '@/views/purchase/Payments.vue'

export default {
  routes: [
    {
      path: '/purchase',
      name: 'purchase',
      component: PurchaseFront
      //component: () => import(/* webpackChunkName: "about" */ '@/views/purchase/PurchaseFront.vue')
    },
    {
      path: '/purchaseBind',
      name: 'purchaseBind',
      component: PurchaseBind
      //component: () => import(/* webpackChunkName: "about" */ '@/views/purchase/PurchaseBind.vue')
    },
    {
      path: '/purchaseSucceeded/:sessionID',
      name: 'purchaseSucceeded',
      component: PurchaseSucceeded
      //component: () => import(/* webpackChunkName: "about" */ '@/views/purchase/PurchaseSucceeded.vue')
    },
    {
      path: '/payments',
      name: 'payments',
      component: Payments
      //component: () => import(/* webpackChunkName: "about" */ '@/views/purchase/Payments.vue')
    },
  ],
  menuItem: { icon: 'shop', text: 'Purchase', route: '/purchase'},
}