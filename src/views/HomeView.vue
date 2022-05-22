<template lang="pug">
div.home
  app-bar
  list-shop-item.itemList(:items="items")
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import AppBar from '@/components/general/appbar/AppBar.vue';
import ListShopItem from '@/components/shop/items/ListShopItem.vue';
import ShopItem from '@/model/shop/ShopItem';

export default defineComponent({
  name: 'HomeView',
  components: {
    AppBar,
    ListShopItem,
  },
  data() {
    return {
      items: [],
      api: axios.create({
        baseURL: 'http://localhost:8080/items',
      }),
    };
  },
  created(){
    this.api.get('/').then(response => {
      this.items = response.data;
    });
  },
  computed: {
    user(){
      return this.$store.state.userStore.user;
    },
  },
});
</script>
<style lang="stylus" scoped>
.home
  min-height: 100vh
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
</style>
