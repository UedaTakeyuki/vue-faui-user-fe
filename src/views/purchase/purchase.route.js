export default {
  routes: [
    {
      path: '/purchase',
      name: 'purchase',
      component: () => import(/* webpackChunkName: "about" */ '@/views/purchase/PurchaseFront.vue')
    },
    {
      path: '/purchaseBind',
      name: 'purchaseBind',
      component: () => import(/* webpackChunkName: "about" */ '@/views/purchase/PurchaseBind.vue')
    },
    {
      path: '/purchaseSucceeded/:sessionID',
      name: 'purchaseSucceeded',
      component: () => import(/* webpackChunkName: "about" */ '@/views/purchase/PurchaseSucceeded.vue')
    },
    {
      path: '/payments',
      name: 'payments',
      component: () => import(/* webpackChunkName: "about" */ '@/views/purchase/Payments.vue')
    },
  ]
}