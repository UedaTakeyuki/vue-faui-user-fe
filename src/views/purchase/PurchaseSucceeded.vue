<template>
  <div class="purchaseSucceeded">
    <p
      class="headline text-center ma-5"
    >
    Thank you for your purchase!
    </p>
    <v-row justify="center">
    <router-link justifiy-content-center :to="'/payments'">Purchase history</router-link>
    </v-row>
<!--    <p>session id: {{$route.params.sessionID}}</p> -->
  </div>
</template>

<script>
import {loadStripe} from '@stripe/stripe-js';
export default {
  data: function () {
    return {
      stripe: "",
      session: "",
    }
  },
  async mounted() {
    this.stripe = await loadStripe('pk_test_TqsPguNyJ9ezM50fWY5TVUvU');
//   this.session = await this.stripe.checkout.sessions.retrieve(this.$route.params.sessionID);
  },

}
</script>