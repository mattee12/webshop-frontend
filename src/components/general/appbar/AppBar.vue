<template lang="pug">
div.appbar
    h1 Webshop
    button-cart.buttonCart(v-if="!isAdmin")
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ButtonCart from './button/ButtonCart.vue'
import User from '@/model/user/User'

export default defineComponent({
    components: {
        ButtonCart,
    },
    props: [],
    computed: {
        user(): User{return this.$store.state.userStore.user;},
        isAdmin(){return this.user.role == 'admin';}
    },
})
</script>
<style lang="stylus" scoped>
.appbar
    background-color: black
    position: fixed
    top: 0
    left: 0
    right: 0
    height: 64px
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    color: white

.appbar h1
    font-weight: normal

.buttonCart
    position: absolute
    right: 32px
</style>