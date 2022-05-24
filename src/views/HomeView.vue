<template lang="pug">
div.home
  app-bar
  list-shop-item.itemList(
    :items="items"
    @items-changed="itemsChanged"
    :action="listAction"
    :loading="isLoading"
    @order="handleOrder"
    @remove="handleRemove")
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import AppBar from '@/components/general/appbar/AppBar.vue';
import ListShopItem from '@/components/shop/items/ListShopItem.vue';
import ShopItem from '@/model/shop/ShopItem';
import User from '@/model/user/User';
import Cart from '@/model/user/Cart';
import ShopItemAction from '@/model/shop/ShopItemAction';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'HomeView',
  components: {
    AppBar,
    ListShopItem,
  },
  data() {
    return {
      items: [] as  ShopItem[],
      api: axios.create({
        baseURL: 'http://localhost:8080',
        withCredentials: true,
      }),
      cart: this.getCart() as Cart,
      isLoading: false,
    };
  },
  created(){
    this.api.get('/item').then(response => {
      this.items = response.data;
    });
  },
  computed: {
    user(): User {return this.$store.state.userStore.user;},
    isAdmin(): boolean {return this.user?.role == 'admin';},
    listAction(): ShopItemAction {return this.isAdmin ? ShopItemAction.REMOVE : ShopItemAction.ORDER;},
  },
  methods: {
    ...mapGetters(['getCart']),
    itemsChanged(items: ShopItem[]){
      this.items = items;
    },
    handleOrder(item: ShopItem){
      this.cart.items.push(item);
      this.isLoading = true;
      this.api.post(`/cart/${item.id}`).then(response => {
        alert('Item added to cart');
        this.cart = response.data;
        this.isLoading = false;
      });
    },
    handleRemove(item: ShopItem){
      this.api.delete(`/item/${item.id}`).then(response => {
        this.items = response.data;
      }).catch((error) => {
        console.log(error.response.data)
      });
    }
  }
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
