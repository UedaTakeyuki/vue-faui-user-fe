<template>
  <v-card
    v-if="$isLogin && $isEmailVerified"
  >
    <v-card-title class="grey--text">
      Account
      <v-spacer/>
      <v-btn
        x-small
        class="grey--text"
        to="/docs/users-manual/account"
      >
        guide
      </v-btn>
    </v-card-title>
    <ContentsList
      :links='links'
    />
  </v-card>
</template>

<script>
import ContentsList from '@/components/ContentsList'
export default {
  components:{
    ContentsList,
  },
  data: function () {
    return {
      links: [
        { icon: '', text: 'Change Email', route: '/changeemail'},
        { icon: '', text: 'Change Name', route: '/changename'},
        { icon: '', text: 'New Password', route: '/newpassword'},
        { icon: '', text: 'Sign Out', route: '/signout'},
        { icon: '', text: 'Delete Account', route: '/deleteaccount'},
      ]
    }
  }
}
</script>