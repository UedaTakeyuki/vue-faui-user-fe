<template>
  <nav>
    <v-toolbar>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="grey--text">
        <span class="font-weight-light">Koshinto </span>
        <span class="caption" >庚申塔</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- logged in icon -->
      <v-tooltip v-if="$isLogin" bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" class="grey--text">person_outline</v-icon>
        </template>
        <span>Logged in as {{ $displayName }}</span>
      </v-tooltip>

      <!-- dropdown menu -->
      <v-menu v-if="!$vuetify.breakpoint.xs" offset-y>
        <template v-slot:activator="{ on }">
        <!-- <v-btn text slot="activator"> -->
        <v-btn text v-on="on">
          <v-icon left class="grey--text">expand_more</v-icon>
          <span class="grey--text">Menu</span>
        </v-btn>
        </template>
        <v-list>
          <!-- eslint-disable -->
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text class="grey--text" v-if="$route.name != 'home'" @click="$router.back()">
        <v-icon>arrow_back</v-icon><!--<span>Back</span>-->
      </v-btn>
<!--
      <v-btn text @click="logout" v-show="user" >
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
-->
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-list>
        <v-layout column align-center class="white--text">
          <v-flex>
            <canvas id="qr"></canvas>
          </v-flex>
          QR code for this App
        </v-layout>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
/* eslint-disable no-console */
// https://qiita.com/saio-th/items/111f6f5cc62f421cf045

import firebase from "firebase/app";
import "firebase/auth";
import QRCode from 'qrcode';

export default {
  data: function () {
    return {
      user: null,
      drawer: false,
      links: [
        { icon: 'home', text: 'Home', route: '/'},
        { icon: 'shop', text: 'Purchase', route: '/purchase'},
        { icon: 'face', text: 'Account', route: '/account'},
      ]
    }
  },
  methods: {
    logout: function(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href = 'index.html';
      }).catch(function(error) {
        console.log(error)
        // An error happened.
      });
      console.log("logout")
      return;
    },
  },
  created: function(){
    /*
    firebase.auth().onAuthStateChanged(user => {
        this.user = user;
    });
    */
  },
  mounted: function(){
    var currentUrl = window.location.origin;
    console.log(currentUrl);
    QRCode.toCanvas(document.getElementById('qr'),
      currentUrl, { toSJISFunc: QRCode.toSJIS }, function (error) {
      if (error) console.error(error)
      console.log('success!')
    })
  }
}
</script>