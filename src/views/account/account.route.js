import AccountFront from '@/views/account/AccountFront.vue'
import ChangeEmail from '@/views/account/ChangeEmail.vue'
import ChangeName from '@/views/account/ChangeName.vue'
import NewPassword from '@/views/account/NewPassword.vue'
import SignOut from '@/views/account/SignOut.vue'
import DeleteAccount from '@/views/account/DeleteAccount.vue'

export default {
  routes: [
    {
      path: '/account',
      name: 'account',
      component: AccountFront
//      component: () => import(/* webpackChunkName: "about" */ '@/views/account/AccountFront.vue')
    },
    {
      path: '/changeemail',
      name: 'changeemail',
      component: ChangeEmail
//      component: () => import(/* webpackChunkName: "about" */ '@/views/account/ChangeEmail.vue')
    },
    {
      path: '/changename',
      name: 'changename',
      component: ChangeName
//      component: () => import(/* webpackChunkName: "about" */ '@/views/account/ChangeName.vue')
    },
    {
      path: '/newpassword',
      name: 'newpassword',
      component: NewPassword
//      component: () => import(/* webpackChunkName: "about" */ '@/views/account/NewPassword.vue')
    },
    {
      path: '/signout',
      name: 'signout',
      component: SignOut
//      component: () => import(/* webpackChunkName: "about" */ '@/views/account/SignOut.vue')
    },
    {
      path: '/deleteaccount',
      name: 'deleteaccount',
      component: DeleteAccount
//      component: () => import(/* webpackChunkName: "about" */ '@/views/account/DeleteAccount.vue')
    },
  ]
}