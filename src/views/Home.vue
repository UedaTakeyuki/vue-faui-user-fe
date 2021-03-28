<template>
  <div class="home">
    <v-container v-if="$isLogin && $isEmailVerified">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <PurchaseFront/>
        </v-col>

        <v-col cols="12" sm="6" md="4" lg="3">
          <AccountFront/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint no-unused-vars: 0 */

import PurchaseFront from "./purchase/PurchaseFront"
import AccountFront from "./account/AccountFront"

export default {
  name: 'home',
  components: {
    PurchaseFront,
    AccountFront,
  },
  data(){
    return {
    }
  },
  mounted(){
    console.log(PurchaseFront)
    console.log(AccountFront)
  }
}
</script>
