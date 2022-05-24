<template lang="pug">
div.list
    div.title
        h1 {{title}}
        p.createButton(v-if="isAdmin" @click="addItem") add item
    pager-container(
        v-if="items.length > 0"
        :max-pages="pagesInFooter"
        :page-size="itemsPerPage"
        :total-items="items.length"
        :page="page"
        @page-selected="handlePageSelect")
        div.content
            shop-item-component(v-for="item in pageItems" :item="item" @order="()=>{handleOrder(item)}" @action="handleAction" @remove="()=>{handleRemove(item)}" :action="action" :loading="loading")
    div.placeholder(v-else)
        p No items to show.
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ShopItem from '@/model/shop/ShopItem';
import ShopItemComponent from '@/components/shop/items/ShopItem.vue';
import PagerContainer from '@/components/general/pager/PagerContainer.vue';
import axios from 'axios';
import User from '@/model/user/User'
import ShopItemAction from '@/model/shop/ShopItemAction';

export default defineComponent({
    props: {
        items: {
            type: Array as () => ShopItem[],
            required: true,
        },
        title: {
            type: String,
            default: "items",
        },
        action: {
            type: Number as () => ShopItemAction,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            page: 1,
            itemsPerPage: 6,
            pagesInFooter: 3,
            api: axios.create({
                baseURL: 'http://localhost:8080',
                withCredentials: true,
            }),
        }
    },
    computed: {
        user(): User {return this.$store.state.userStore.user;},
        isAdmin(): boolean {return this.user?.role == 'admin';},
        pageItems(): ShopItem[] {return this.items.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);},
        actionString(): string {
            switch(this.action){
                case ShopItemAction.ORDER: return 'order';
                case ShopItemAction.REMOVE: return 'remove';
                default: return 'order';
            }
        },
    },
    components: {
        ShopItemComponent,
        PagerContainer,
    },
    methods: {
        addItem(){
            this.$router.push('/add');
        },
        handlePageSelect(page: number){
            this.page = page;
        },
        handleAction(item: ShopItem){
            this.$emit(this.actionString, item);
        },
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