import AccountFront from './views/account/AccountFront.vue';
import PurchaseFront from './views/purchase/PurchaseFront.vue';
import AccountRoutes from '@/views/account/account.route.js'
import PurchaseRoutes from '@/views/purchase/purchase.route.js'
import Login from '@/components/Login2.vue'
import EmailVerificationRequest from '@/components/EmailVerificationRequest2.vue'


// Named export
export {
	AccountFront,
	AccountRoutes,
	PurchaseFront,
	PurchaseRoutes,
	Login,
	EmailVerificationRequest
};

// Default export
export default {
	AccountFront,
	AccountRoutes,
	PurchaseFront,
	PurchaseRoutes,
	Login,
	EmailVerificationRequest
};