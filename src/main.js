/* eslint-disable no-console */
// https://qiita.com/saio-th/items/111f6f5cc62f421cf045
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'
//import VueGtag from "vue-gtag"

Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: process.env.VUE_APP_databaseURL,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
};
console.log(firebaseConfig)
Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig);
console.log("Vue.prototype.$firebase", Vue.prototype.$firebase)

const get_browser_lang = () => {
  const browser_lang = navigator.language.toLowerCase();
  switch(true){
//    case "ja-jp":
//    case "ja":
    case /ja.*/.test(browser_lang):
      return "ja";
    case /zh.*/.test(browser_lang):
      return "zh";
//      break;
//    case "zh-CN"
    default:
      return "en";
//      break;
  }
};
// global

/*
var Global = {
  onLogin: false,
  onEmailVerified: false,
  internallUserId: "",
  loggedinAndVerified(){
    return this.onLogin && this.onEmailVerified
  }
}

Vue.prototype.$mlGlobal = Global;
*/

// https://stackoverflow.com/questions/49256765/change-vue-prototype-variable-in-all-components
let globalData = new Vue({
  data: { 
    $lang: get_browser_lang(),
    $isLogin: true,
    $isEmailVerified: true,
    $internalUserId: "",
    $stripe: process.env.VUE_APP_stripeEnv == "live" ? process.env.VUE_APP_stripeapiLiveKey : process.env.VUE_APP_stripeapiTestKey,
    $stripeEnv: process.env.VUE_APP_stripeEnv,
    $server: process.env.VUE_APP_serverProtocol + "://" 
             + process.env.VUE_APP_serverHost +"."
             + process.env.VUE_APP_serverDomain,
  }
});
Vue.mixin({
  computed: {
    $lang: {
      get: function () { return globalData.$data.$lang },
      set: function (newLang) { globalData.$data.$lang = newLang; }
    },
    $isLogin: {
      get: function () { return globalData.$data.$isLogin },
      set: function (newIsLogin) { globalData.$data.$isLogin = newIsLogin; }
    },
    $isEmailVerified: {
      get: function () { return globalData.$data.$isEmailVerified },
      set: function (newIsEmailVerified) { globalData.$data.$isEmailVerified = newIsEmailVerified; }
    },
    $internalUserId: {
      get: function () { return globalData.$data.$internalUserId },
      set: function (newInternalUserId) { globalData.$data.$internalUserId = newInternalUserId; }
    },
    $displayName: {
      get: function () { return globalData.$data.$displayName },
      set: function (newDisplayName) { globalData.$data.$displayName = newDisplayName; }
    },
    $user_email: {
      get: function () { return globalData.$data.$user_email },
      set: function (newUser_email) { globalData.$data.$user_email = newUser_email; }
    },
    $user_id: {
      get: function () { return globalData.$data.$user_id },
      set: function (newUser_id) { globalData.$data.$user_id = newUser_id; }
    },
    $stripe: {
      get: function () { return globalData.$data.$stripe },
    },
    $stripeEnv: {
      get: function () { return globalData.$data.$stripeEnv },
    },
    $server: {
      get: function () { return globalData.$data.$server },
    },

  }
})
//Vue.prototype.$lang = globalData.$lang;

// gtag Auto tracking
/*
Vue.use(VueGtag, {
  config: { id: "UA-43410269-6" },
  appName: 'Koshinto',
  pageTrackerScreenviewEnabled: true
}, router);
*/

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
