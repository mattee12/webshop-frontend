<template lang="pug">
div.view
    app-bar
    div.listContainer
        list-shop-item(
            :items="cart.items"
            title="cart"
            :action="listAction"
            :loading="isLoading"
            @remove="handleRemove")
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AppBar from '@/components/general/appbar/AppBar.vue'
import { mapGetters } from 'vuex';
import axios from 'axios';
import ShopItemComponent from '@/components/shop/items/ShopItem.vue';
import ShopItem from '@/model/shop/ShopItem';
import ShopItemAction from '@/model/shop/ShopItemAction'
import ListShopItem from '@/components/shop/items/ListShopItem.vue';

export default defineComponent({
    components: {
        AppBar,
        ShopItemComponent,
        ListShopItem,
    },
    data() {
        return {
            cart: this.getCart(),
            api: axios.create({
                baseURL: 'http://localhost:8080/cart',
                withCredentials: true,
            }),
            isLoading: false,
            listAction: ShopItemAction.REMOVE,
        }
    },
    methods: {
        ...mapGetters(['getCart']),
        handleRemove(item: ShopItem){
            this.isLoading = true;
            this.api.delete(`/${item.id}`).then(response => {
                this.cart = response.data;
                this.isLoading = false;
            });
        }
    },
    created(){
        this.api.get(`/`).then(response => {
            this.cart = response.data;
        });
    },
})
</script>
<style lang="stylus" scoped>
.listContainer
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

.placeholder
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    font-size: 32px
    padding: 64px
</style>
