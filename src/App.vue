<template>
  <v-app>
    <Navbar />
    <div id="nav">
      <Login/>
    </div>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer
      padless
      height="1px"
      class="grey lighten-5"
    >
      <v-col
        class="text-center"
      >
        <p class="grey--text caption">
          &copy; 2020 - <a href="https://atelierueda.uedasoft.com/">Atelier UEDA</a>
        </p>
      </v-col>
    </v-footer>    
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Login from '@/components/Login.vue'

var fernet = require('fernet');
var secret = new fernet.Secret("cw_0x689RpI-jtRR7oE8h_eQsKImvJapLeSbXpwF4e4=");
//console.log(secret)
var token = new fernet.Token({
  secret: secret,
  time: Date.parse(1),
  iv: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
})
console.log(token.encode("abc"))

export default {
  name: 'App',

  components: {
    Navbar,
    Login,
  },

  data: () => ({
    //
  }),
  computed: {
  }
};
</script>
