<template lang="pug">
div.list
    div.title
        h1 Items
        p.createButton(v-if="isAdmin" @click="addItem") add item
    pager-container(
        v-if="items.length > 0"
        :max-pages="pagesInFooter"
        :page-size="itemsPerPage"
        :total-items="items.length"
        :page="page"
        @page-selected="handlePageSelect")
        div.content
            shop-item-component(v-for="item in pageItems" :item="item" @order="()=>{handleOrder(item)}" @remove="()=>{handleRemove(item)}" :action="action" :is-loading="isLoading")
    div.placeholder(v-else)
        p No items to show.
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ShopItem from '@/model/shop/ShopItem';
import ShopItemComponent from '@/components/shop/items/ShopItem.vue';
import PagerContainer from '@/components/general/pager/PagerContainer.vue';
import { mapGetters } from 'vuex';
import axios from 'axios';
import Cart from '@/model/user/Cart'
import ShopItemAction from '@/model/shop/ShopItemAction';

export default defineComponent({
    props: {
        items: {
            type: Array as () => ShopItem[],
            required: true,
        }
    },
    data() {
        return {
            page: 1,
            itemsPerPage: 6,
            pagesInFooter: 3,
            cart: this.getCart() as Cart,
            token: localStorage.getItem('token'),
            api: axios.create({
                baseURL: 'http://localhost:8080',
            }),
            isLoading: false,
        }
    },
    computed: {
        user(){return this.$store.state.userStore.user;},
        isAdmin(){return this.user?.role == 'admin';},
        pageItems(){return this.items.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);},
        action(){return this.isAdmin? ShopItemAction.REMOVE: ShopItemAction.ORDER;},
    },
    components: {
        ShopItemComponent,
        PagerContainer,
    },
    methods: {
        ...mapGetters(['getCart']),
        addItem(){
            this.$router.push('/add');
        },
        handlePageSelect(page: number){
            this.page = page;
        },
        handleOrder(item: ShopItem){
            this.cart.items.push(item);
            this.isLoading = true;
            this.api.post(`/cart/${this.token}/${item.id}`).then(response => {
                alert('Item added to cart');
                this.cart = response.data;
                this.isLoading = false;
            });
        },
        handleRemove(item: ShopItem){
            this.api.delete(`/items/${item.id}`).then(response => {
                this.$emit('items-changed', response.data);
            }).catch(() => {
                alert('Error removing item');
            });
        }
    }
})
</script>
<style lang="stylus" scoped>
.title
    display: flex
    flex-direction: row
    align-items: baseline
    border-bottom: 2px solid black
    padding: 8px 16px

.createButton
    color: blue
    font-size: 16px
    margin-left: 16px
    cursor: pointer

.list
    display: flex
    flex-direction: column
    align-items: stretch
    justify-content: center
    border: 4px solid black
    min-width: 480px
    min-height: 480px

.placeholder
    display: flex
    flex-direction: column
    flex: 1

.content
    display: grid
    grid-template-columns: repeat(3, 1fr)
    grid-template-rows: repeat(2, 1fr)
    grid-gap: 16px
    padding: 24px
    padding-bottom: 0px

.placeholder
    font-size: 24px
    align-items: center
    justify-content: center
</style>