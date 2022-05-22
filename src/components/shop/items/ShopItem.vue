<template lang="pug">
div.shopItem
    div.title
        p {{item.name}}
    div.content
        p {{item.description}}
    div.footer
        span.price {{item.price}} $
        p.buttonOrder(@click="$emit('order', item)") order
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ShopItem from '@/model/shop/ShopItem'

export default defineComponent({
    props: {
        item: {
            type: ShopItem,
            required: true,
        }
    }
})
</script>
<style lang="stylus" scoped>
.shopItem
    display: flex
    flex-direction: column
    width: 180px
    height: 180px
    border: 2px solid black
    margin-right: 24px
    &:last-of-type
        margin-right: 0
.title
    border-bottom: 2px solid black
    padding: 8px 16px
    font-size: 24px
    font-weight: bold
.content
    display: flex
    flex: 1
    padding: 24px
.footer
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    padding: 8px 16px
    font-size: 16px

.price
    color: #0a0

.buttonOrder
    color: blue
    cursor: pointer
</style>