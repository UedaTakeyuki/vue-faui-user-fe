<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2 subtitle-1"
          primary-title
        >
          <span>Edit</span>
          <v-spacer></v-spacer>
          <span class="caption">ID: {{Bid}}</span>
          <v-spacer></v-spacer>
          <v-btn 
            x-small 
            class="grey--text"
            to="/docs/users-manual/binds/bindmenu"
          >
              guide
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-expansion-panels
          >
            <Keys
              :bind='bind'
              ref="refKeys"
            />
            <Status
              :bind='bind'
              ref="refStatus"
            />
            <Sansi
              :bind='bind'
              ref="refSansi"
            />
            <SafekeepedKey
              :bind='bind'
              ref="refSafekeepedKey"
            />
          </v-expansion-panels>
        </v-card-text>

        <v-divider/>

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
            @click="update"
          >
            update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Keys from '@/components/edit/Keys'
import Status from '@/components/edit/Status'
import Sansi from '@/components/edit/Sansi'
import SafekeepedKey from '@/components/edit/SafekeepedKey'
//import firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios'
// https://github.com/alexei/sprintf.js
var sprintf = require('sprintf-js').sprintf//,
//    vsprintf = require('sprintf-js').vsprintf

export default {
  props: ['bind'],

  components: {
    Keys,
    Status,
    Sansi,
    SafekeepedKey,
  },
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    open() {
      this.dialog = true;
//      this.refreshBind(this.bind) // not working here!
    },
    cancel(){
      this.refreshBind(this.bind)
      this.dialog = false
    },
    update(){
      this.updateBind()
      this.dialog = false
    },
    refreshBind(bind){
      /*
      console.log("Edit - refreshBind", bind)
      for (const ref in this.$refs){
        if (ref) { // not null
          ref.refreshBind(bind)
        }
      }
      */

      // BindWith
      if (this.$refs.refBindwith){
        this.$refs.refBindwith.refreshBind(bind)
      }
      // Keys
      if (this.$refs.refKeys){
        this.$refs.refKeys.refreshBind(bind)
      }
      // SafekeepedKey
      if (this.$refs.refSafekeepedKey){
        this.$refs.refSafekeepedKey.refreshBind(bind)
      }

      // status
      if (this.$refs.refStatus){
        this.$refs.refStatus.refreshBind(bind)
      }
    },
    updateBind(){
      var updates = {}

      // bindwith
      //this.$refs.refBindwith.updateBind(updates, this.bind)
      updates["bindwith"] = 0

      // Keys
//      console.log("refKeys")
      /*
      for (const ref in this.$refs){
        if (ref) { // not null
          ref.updateBind(updates, bind)
        }
      }
      */
//      console.log("this.$refs.refKeys",this.$refs.refKeys)
      if (this.$refs.refKeys){
        this.$refs.refKeys.updateBind(updates, this.bind)
        if (updates["bindwith"] == this.bind.BindWith){
          // no need to update
          delete updates["bindwith"]
        } else {
          // update to bind
          this.bind.BindWith = updates["bindwith"]
        }
      }

      // Status
      if (this.$refs.refStatus){
        console.log("refStatus")
        this.$refs.refStatus.updateBind(updates, this.bind)
      }

      // safekeepedkey
      if(this.$refs.refSafekeepedKey){
        console.log("refSafekeepedKey")
        this.$refs.refSafekeepedKey.updateBind(updates, this.bind)
      }

      // for debug
      console.log("updates",updates)
      console.log("bind",this.bind)

      if (0 === Object.keys(updates).length){
        // no need to update!
        return
      }

      var user = this.$firebase.auth().currentUser;
      if (user) {
        user.getIdToken(/* forceRefresh */ true).then((idToken) => {
          const url = sprintf(this.$server + '/v1/UpdateBind/%s/%s', this.bind.Bid, idToken)
          console.log("url",url)
          console.log("updates",updates)
          axios
          .post(url, updates)
          .then(response => {
            if (response.status == 200) {
              console.log("status = ", response.status)
            }
          });
        });
      }
    },
  },
  computed: {
    Bid(){
      if (this.bind){
        return this.bind.Bid
      } else {
        return ""
      }
    },
  },
  updated: function(){
    console.log("Edit updated - bind:",this.bind)
    // Dom was re-renderd and child components are active.
    // So, calling of refreshBind of childs are possible only at this this timing!
    if (this.bind){
      // this.bind not null
      this.refreshBind(this.bind)
    }
  },
  /*
  watch: {
    /* eslint no-unused-vars: 0 *//*
    bind: function(newBind, oldBind) {
      console.log("watch", newBind)
      this.refreshBind(newBind)
    },
  },
  */
}
</script>