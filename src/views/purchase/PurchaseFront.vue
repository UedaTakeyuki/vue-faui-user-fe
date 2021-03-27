<template>
  <v-card
    v-if="$isLogin && $isEmailVerified"
  >
    <v-card-title class="grey--text">
      Purchase
      <v-spacer/>
      <v-btn
        x-small
        class="grey--text"
        to="/docs/users-manual/purchase"
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
        { icon: '', text: 'Buy new Bind', route: '/purchaseBind'},
        { icon: '', text: 'Purchase history', route: '/payments'},
      ]
    }
  }
}
</script>