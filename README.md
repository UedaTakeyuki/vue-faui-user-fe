# Vue Firebase auth ui user management frontend pack
Provide following feature to your vue app.
- Login by firebase auth ui with email, verification required.
- Account Management (cange name and email address, delete account, etc)

## Install
```yarn add vue-faui-user-fe```

## How to use it in your app

### 1. initialize **firebase app** and set it to scope instance property **Vue.prototype.$firebase** at ``main.js`` on your vue app

Set the firebase app object initialized at the very first of your to **Vue.prototype.$firebase** for enable to be used by the inside of this package. For example:

```vue{13}
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: process.env.VUE_APP_databaseURL,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
};

Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
```

The $firebase, which has been initialized, is intended to be used by the components.

Note that initialization of the firebase app can be available only **one time**, second time initialization must be caused an error. So, initialized firebase app shoud be pathed to componets like this manner.

Please refer a real implementation on a [sample project](https://github.com/UedaTakeyuki/vue-faui-user-fe-sample/blob/main/src/main.js#L33).

### 2. Copy **Login.vue** and **EmailVerificationRequest.vue* in your app

Due to technically unresolved issues, we can't get success to include the following vue components which are required for login authentication into our package.

- Login.vue
- EmailVerificationRequest.vue

For now, copy them from the following repositories to your application.

- from: 


By the way, the detail of the unresouved technical issue mentioned above is, the value ``firebase.auth.EmailAuthProvider`` of **$firebase** mentioned last section get **null** inside our package despite other values seem no problem. Any ideas on this issue are welcome, thank you for your help! 



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Running Site
https://koshinto.uedasoft.com/

## Settings

### Firebase
1. Pass firebase configration by environment variables as follows:
- VUE_APP_apiKey
- VUE_APP_authDomain
- VUE_APP_databaseURL
- VUE_APP_projectId
- VUE_APP_storageBucket
- VUE_APP_messagingSenderId
- VUE_APP_appId

You can use .env.local file on the top of local environment, or Server environment.

2. Add the domain on which this this application running, to the white list of firebase auth. Detail is as [here](https://qiita.com/UedaTakeyuki/items/f2553f540b0bf145177b).
