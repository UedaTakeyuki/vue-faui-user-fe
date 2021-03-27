export default {
  routes: [
    {
      path: '/account',
      name: 'account',
      component: () => import(/* webpackChunkName: "about" */ '@/views/account/AccountFront.vue')
    },
    {
      path: '/changeemail',
      name: 'changeemail',
      component: () => import(/* webpackChunkName: "about" */ '@/views/account/ChangeEmail.vue')
    },
    {
      path: '/changename',
      name: 'changename',
      component: () => import(/* webpackChunkName: "about" */ '@/views/account/ChangeName.vue')
    },
    {
      path: '/newpassword',
      name: 'newpassword',
      component: () => import(/* webpackChunkName: "about" */ '@/views/account/NewPassword.vue')
    },
    {
      path: '/signout',
      name: 'signout',
      component: () => import(/* webpackChunkName: "about" */ '@/views/account/SignOut.vue')
    },
    {
      path: '/deleteaccount',
      name: 'deleteaccount',
      component: () => import(/* webpackChunkName: "about" */ '@/views/account/DeleteAccount.vue')
    },
  ]
}