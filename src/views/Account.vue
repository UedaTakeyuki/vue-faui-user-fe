<template>
<v-container v-if="user">
  <h1>account</h1>
  <v-row>
    <!-- email -->
    <v-col cols="12" sm="6" md="4" lg="3">
      <ChangeEmail/>
    </v-col>

    <!-- name -->
    <v-col cols="12" sm="6" md="4" lg="3">
      <ChangeName/>
    </v-col>

    <!-- password -->
    <v-col cols="12" sm="6" md="4" lg="3">
      <NewPassword/>
    </v-col>

    <!-- sign out -->
    <v-col cols="12" sm="6" md="4" lg="3">
      <SignOut/>
    </v-col>

    <!-- delete account -->
    <v-col cols="12" sm="6" md="4" lg="3">
      <DeleteAccount/>
    </v-col>

  </v-row>

</v-container>
</template>


<script>
/* eslint-disable no-console */
// https://qiita.com/saio-th/items/111f6f5cc62f421cf045

import ChangeEmail from '@/view/account/ChangeEmail'
import ChangeName from '@/view/account/ChangeName'
import NewPassword from '@/view/account/NewPassword'
import SignOut from '@/view/account/SignOut'
import DeleteAccount from '@/view/account/DeleteAccount'
import User from "@/view/account/User"

export default {
  components: {
    ChangeEmail,
    ChangeName,
    NewPassword,
    SignOut,
    DeleteAccount,
  },
  mixins: [User],
  data: function () {
    return {
    }
  },
  methods: {
  },
  created: function(){
  },
  mounted() {
  },
}
</script>