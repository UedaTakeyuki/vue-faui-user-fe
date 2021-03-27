<template>
  <div class="payments">
    <v-card>
      <v-card-text>
      <v-list
        shaped
        dense
        style="max-height: 250px"
        class="overflow-y-auto"
      >

      <v-subheader>
        Purchase histories
        <v-spacer/>
        <v-btn
          x-small
          class="grey--text"
          to="/docs/users-manual/purchase/purchasehistory"
        >
          guide
        </v-btn>
        </v-subheader>

      <v-progress-linear
        v-if="progressLinear"
        indeterminate
        color="primary"
      ></v-progress-linear>
          <v-list-item
            v-for="payment in payments"
            :key="payment.ID"
            @click="aho(bind)"
          >
            <v-list-item-content>
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header class="grey--text">
                    {{toDateString(Number(payment.Created)*1000)}}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
<!--                    <p><span class="grey--text">productCategory: </span>{{payment}}</p> -->
                    <p><span class="grey--text">amount: </span>{{payment.Amount/100}} {{payment.Currency}}</p>
                    <p><span class="grey--text">payment id: </span>{{payment.ID}}</p>
                    <p><span class="grey--text">payment for: </span>
                      <span 
                        v-if="payment.ProductCategory == 'bind'"
                      >
                        bind 
                      </span>
                      <span 
                        v-if="payment.ProductCategory == 'extention'"
                      >
                        extension 
                      </span>
                      <router-link 
                        :to="'/purchased/'+payment.Internal_ID"
                        v-if='payment.ProductCategory == "bind"'
                      >
                        link to Purchased binds
                      </router-link>
                    </p>

                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-list-item-content>
          </v-list-item>
      </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          v-show="isNavigateBefore"
          fab
          small
          class="gray--text"
          @click="getPayments('', payments[0].ID)"
        >
          <v-icon>navigate_before</v-icon>
        </v-btn>
        <v-btn
          v-show="isNavigateNext"
          fab
          small
          class="gray--text"
          @click="getPayments(payments[limit-1].ID,'')"
        >
          <v-icon>navigate_next</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
/* eslint no-unused-vars: 0 */
import DateString from '@/components/DateString'
import firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios'
// https://github.com/alexei/sprintf.js
var sprintf = require('sprintf-js').sprintf,
    vsprintf = require('sprintf-js').vsprintf

export default {
  mixins: [DateString],
  data: function () {
    return {
      payments: [],
      limit: 10,

      latestPaymentID: "",
      tobecontinued: false,

      latestStartingAfter: "", // return from server
      latestEndingBefore: "",  // return from server

      // progress-linear on/off
      progressLinear: false,
    }
  },
  methods: {
    getPayments(startingAfter, endingBefore){
      var user = firebase.auth().currentUser;
      if (user) {
        user.getIdToken(/* forceRefresh */ true).then((idToken) => {
          var url
          var params = new URLSearchParams();
          url = sprintf(this.$koshinto + '/v1/paymenthistorys/%s/%s', this.limit, idToken)
          if (startingAfter != ""){
            params.append('startingAfter', startingAfter);
          }
          if (endingBefore != ""){
            params.append('endingBefore', endingBefore);
          }
          this.progressLinear = true; // start progressLinear 

          axios
          .post(url,params)
          .then(response => {
            console.log("response:", response)
            console.log("params",params)
            if (response.status == 200) {
              this.payments = response.data.payments
              this.tobecontinued = response.data.tobecontinued
              this.latestStartingAfter = response.data.startingAfter
              this.latestEndingBefore = response.data.endingBefore

              // first get
//              if (params.startingAfter == "" && params.endingBefore == ""){
              if (response.data.latestPayments && this.payments.length != 0){
                this.latestPaymentID = this.payments[0].ID
              }

              // stop progress_linear
              this.progressLinear = false; // stop progressLinear
            }
          });
        })
      }
    },
    aho(){
      console.log("aho")
    },
    /*
    toDateString(unixtime){
      let dateTime = new Date(unixtime * 1000);
      let dtstr = dateTime.toString()
      let dtstrs = dtstr.split(' ');
      dtstrs.splice(3,1) // delete milli second.
      dtstrs.splice(4,2) // delete timezone.
      return dtstrs.join(' ')
    }*/
  },
  computed: {
    isNavigateBefore(){
      if (this.latestPaymentID == ""){
        return false
      } else {
        if (this.latestPaymentID == this.payments[0].ID){
          return false
        } else {
          return true
        }
      }
    },
    isNavigateNext(){
      if (this.latestEndingBefore != "") {
        // now in result of back, so can do next
        // with ndingBefore, can't get correct tobecontinued value, so work around
        return true
      } else {
        return this.tobecontinued
      }
    }
  },
  watch: {
    // watch $internalUseriD and call getBinds in case owner id is not set at mounted
    $internalUserId: function(newinternalUserId, oldinternalUserId) {
      console.log("watch", this)
      this.getPayments("","")
    },
  },
  mounted(){
    console.log("onmounted", this)
    this.getPayments("","")
  }
}
</script>