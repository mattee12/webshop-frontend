<template lang="pug">
div.shopItem(v-if="item")
    div.title
        p {{item.name}}
    div.content
        p {{item.description}}
    div.footer
        span.price {{item.price}} $
        p.button(@click="handleClick" :class="`${isLoading ? 'disabled' : ''} ${actionString}`") {{actionString}}
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ShopItem from '@/model/shop/ShopItem'
import ShopItemAction from '@/model/shop/ShopItemAction'

export default defineComponent({
    props: {
        item: {
            type: Object as () => ShopItem,
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
        action: {
            type: Number as () => ShopItemAction,
            required: true
        }
    },
    methods: {
        handleClick(){
            this.$emit(this.actionString, this.item);
        }
    },
    computed: {
        actionString(){
            switch(this.action){
                case ShopItemAction.ORDER: return 'order';
                case ShopItemAction.REMOVE: return 'remove';
                default: return 'order';
            }
        },
    }
})
</script>
<style lang="stylus" scoped>
.shopItem
    display: flex
    flex-direction: column
    width: 200px
    height: 200px
    border: 2px solid black

.title
    border-bottom: 2px solid black
    padding: 8px 16px
    font-size: 24px
    font-weight: bold
.content
    display: flex
    flex: 1
    overflow-y: scroll
    overflow-x: hidden
    word-wrap: anywhere
    padding: 8px 16px
.footer
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    padding: 8px 16px
    font-size: 16px

.price
    color: #0a0

.button
    cursor: pointer
    &.remove
        color: red
    &.order
        color: blue
    &.disabled
        cursor: default
        color: gray
</style>