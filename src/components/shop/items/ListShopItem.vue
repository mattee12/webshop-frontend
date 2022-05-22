<template lang="pug">
div.list
    div.title
        h1 Items
        p.createButton(v-if="isAdmin" @click="addItem") add item
    div.content(v-if="items.length > 0")
        shop-item-component(v-for="item in items" :item="item")
    div.placeholder(v-else)
        p No items to show.
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ShopItem from '@/model/shop/ShopItem';
import ShopItemComponent from '@/components/shop/items/ShopItem.vue';

export default defineComponent({
    props: {
        items: {
            type: Array as () => ShopItem[],
            required: true,
        }
    },
    computed: {
        user(){return this.$store.state.userStore.user;},
        isAdmin(){return this.user.role == 'admin';}
    },
    components: {
        ShopItemComponent
    },
    methods: {
        addItem(){
            this.$router.push('/add');
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

.content
.placeholder
    display: flex
    flex-direction: column
    flex: 1

.content
    padding: 16px
    flex-direction: row
    align-items: flex-start
    justify-content: flex-start

.placeholder
    font-size: 24px
    align-items: center
    justify-content: center
</style>