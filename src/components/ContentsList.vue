<template>
  <v-list>
    <v-list-item
      v-for="link in links" :key="link.text"
      :to="link.route"
      class="ml-5"
      dense
    >
      <v-list-item-content class="grey--text">{{link.text}}</v-list-item-content>
    </v-list-item>
  </v-list>  
</template>

<script>
export default {
  props: ['links'],
}
</script>