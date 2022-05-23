<template lang="pug">
div.view
    app-bar
    div.listContainer(v-if="cart.items.length > 0")
        shop-item-component(v-for="item in cart.items" :item="item" @remove="removeItem" :action="action" :is-loading="isLoading")
    div.placeholder(v-else)
        p Your cart is empty.
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AppBar from '@/components/general/appbar/AppBar.vue'
import { mapGetters } from 'vuex';
import axios from 'axios';
import ShopItemComponent from '@/components/shop/items/ShopItem.vue';
import ShopItem from '@/model/shop/ShopItem';
import ShopItemAction from '@/model/shop/ShopItemAction'

export default defineComponent({
    components: {
        AppBar,
        ShopItemComponent,
    },
    data() {
        return {
            cart: this.getCart(),
            api: axios.create({
                baseURL: 'http://localhost:8080/cart',
            }),
            token: localStorage.getItem('token')?.toString() ?? '',
            isLoading: false,
            action: ShopItemAction.REMOVE,
        }
    },
    methods: {
        ...mapGetters(['getCart']),
        removeItem(item: ShopItem){
            this.isLoading = true;
            this.api.delete(`/${item.id}`, {
                headers: {
                    'access-token': this.token,
                }
            }).then(response => {
                this.cart = response.data;
                this.isLoading = false;
            });
        }
    },
    created(){
        this.api.get(`/`, {
            headers: {
                'access-token': this.token,
            }
        }).then(response => {
            this.cart = response.data;
        });
    },
})
</script>
<style lang="stylus" scoped>
.listContainer
    display: grid
    grid-template-columns: repeat(6, 1fr)
    grid-template-rows: repeat(4, 1fr)
    padding: 64px
    grid-gap: 16px

.placeholder
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    font-size: 32px
    padding: 64px
</style>
