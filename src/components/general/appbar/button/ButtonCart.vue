<template lang="pug">
p(@click="handleCart") cart
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    methods: {
        handleCart(){
            this.$router.push('/cart');
        },
    },
})
</script>
<style lang="stylus" scoped>
p
    color: white
    font-size: 24px
    cursor: pointer
    padding: 4px 16px
    border: 2px solid white
</style>