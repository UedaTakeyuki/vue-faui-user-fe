<template>
  <div class="purchaseBind">
    <v-card>
      <v-card-title>
        Buy new binds
        <v-spacer/>
        <v-btn 
          x-small
          class="grey--text"
          to="/docs/users-manual/purchase/purchasebind"
        >
          guide
        </v-btn>
      </v-card-title>
      <v-card-text>
        Additional <span class="font-weight-bold">With Expiration</span> bind is available here. 
        The expiration is <span class="font-weight-bold">one year from activation</span> of this, and you can extend it.
      </v-card-text>
      <v-card-title>
        A bind
      </v-card-title>
      <v-card-text>
        Price: 2$ each
        <v-select
          v-model="quantityOf_1_Bind"
          :items="items"
          label="Quantity"
        >
        </v-select>
        binds: {{quantityOf_1_Bind}}
        price: {{2*quantityOf_1_Bind}} $
      </v-card-text>

      <v-card-title>10 pieces of additional binds</v-card-title>
      <v-card-text>
        Price: 18$ each
        <v-select
          v-model="quantityOf_10_Bind"
          :items="items"
          label="Quantity"
        >
        </v-select>
        binds: {{10*quantityOf_10_Bind}}
        price: {{18*quantityOf_10_Bind}} $
      </v-card-text>

      <v-card-title>100 pieces of additional binds</v-card-title>
      <v-card-text>
        Price: 160$ each
        <v-select
          v-model="quantityOf_100_Bind"
          :items="items"
          label="Quantity"
        >
        </v-select>
        binds: {{10*quantityOf_100_Bind}}
        price: {{18*quantityOf_100_Bind}} $
      </v-card-text>

      <v-card-title>1000 pieces of additional binds</v-card-title>
      <v-card-text>
        Price: 1400$ each
        <v-select
          v-model="quantityOf_1000_Bind"
          :items="items"
          label="Quantity"
        >
        </v-select>
        binds: {{10*quantityOf_1000_Bind}}
        price: {{18*quantityOf_1000_Bind}} $
      </v-card-text>

      <v-card-title>Total</v-card-title>
      <v-card-text>
        binds: {{quantityOf_1_Bind + 10*quantityOf_10_Bind + 100*quantityOf_100_Bind + 1000*quantityOf_1000_Bind}}
        price: {{2*quantityOf_1_Bind + 18*quantityOf_10_Bind + 160*quantityOf_100_Bind + 1400*quantityOf_1000_Bind}} $
      </v-card-text>
      <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-spacer/>
          <v-btn
            color="primary"
            text
            @click="purchase"
          >
            Purchase
          </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
/* eslint no-unused-vars: 0 */
import firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios'
// @ is an alias to /src
import {loadStripe} from '@stripe/stripe-js';
//const stripe = await loadStripe('pk_test_TqsPguNyJ9ezM50fWY5TVUvU');
// const stripe = require("stripe")(process.env.STRPE_KEY);
// npm install --save stripe
//const stripe = require("stripe")('pk_test_TqsPguNyJ9ezM50fWY5TVUvU');
var sprintf = require('sprintf-js').sprintf,
    vsprintf = require('sprintf-js').vsprintf

export default {
  name: 'purchaseBindj',
  components: {
  },
  data(){
    return {
      // v-select
      quantityOf_1_Bind: 0,
      quantityOf_10_Bind: 0,
      quantityOf_100_Bind: 0,
      quantityOf_1000_Bind: 0,
      items: [0,1,2,3,4,5,6,7,8,9,],
      // stripe
      stripe: "",
      priceID: "price_1HDikyG8LX1Yc059kjBrDF6Y",
      quantity: 3,
    }
  },
  methods: {
    purchase_1_bind(){
      const url = sprintf(this.$koshinto + '/cntl/buy/%s/%s', "price_1HCK0qG8LX1Yc059ZXzuN5gO", this.quantityOf_1_Bind)
      this.checkout(url)
    },
    purchase_10_bind(){
      const url = sprintf(this.$koshinto + '/cntl/buy/%s/%s', "price_1HDikyG8LX1Yc059kjBrDF6Y", this.quantityOf_10_Bind)
      this.checkout(url)
    },
    checkout(url){
      axios
      .get(url)
      .then(response => {
        if (response.status == 200) {
          console.log("response = ", response)
          this.stripe.redirectToCheckout({sessionId: response.data.SessionID})
        }
      });
    },
    purchase(){
      var user = firebase.auth().currentUser;
      if (user) {
        user.getIdToken(/* forceRefresh */ true).then((idToken) => {
          const url = sprintf(this.$koshinto + '/v1/sessionIDforBind/%s', idToken)
          axios
          .post(url,this.lineitems)
          .then(response => {
            if (response.status == 200) {
              console.log("response = ", response)
              this.stripe.redirectToCheckout({sessionId: response.data.SessionID})
            }
          });
        });
      }
    },
    cancel(){
      var user = firebase.auth().currentUser;
      if (user) {
        user.getIdToken(/* forceRefresh */ true).then((idToken) => {
          const url = sprintf(this.$koshinto + '/v1/customerportal/%s', idToken)
          axios
          .get(url)
          .then(response => {
            if (response.status == 200) {
              console.log("response = ", response)
              this.stripe.redirectToCheckout({sessionId: response.data.SessionID})
            }
          });
        });
      }
    },
  },
  async mounted() {
    this.stripe = await loadStripe(this.$stripe);
  },
  computed: {
    lineitems(){
      return [
        {
          priceID:  this.$stripeEnv =="live" ? "price_1HlZLpG8LX1Yc059H5BBLtt4": "price_1HCK0qG8LX1Yc059ZXzuN5gO",
          quantity: this.quantityOf_1_Bind,
          unit: 1,
        },
        {
          priceID:  this.$stripeEnv =="live" ? "price_1HlZLiG8LX1Yc059weizxPJH": "price_1HDikyG8LX1Yc059kjBrDF6Y",
          quantity: this.quantityOf_10_Bind,
          unit: 10,
        },
        {
          priceID:  this.$stripeEnv =="live" ? "price_1HlZLbG8LX1Yc059jhkqv38o": "price_1HDimRG8LX1Yc0593euV93sL",
          quantity: this.quantityOf_100_Bind,
          unit: 100,
        },
        {
          priceID:  this.$stripeEnv =="live" ? "price_1HlZLOG8LX1Yc059SXTx0ZTi": "price_1HDirNG8LX1Yc059X9FT0X3e",
          quantity: this.quantityOf_1000_Bind,
          unit: 1000,
        },
      ]
    }
  }

}
</script>

