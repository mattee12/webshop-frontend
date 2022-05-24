<template lang="pug">
div.appbar
    h1(@click="toHome") Webshop
    div.buttons
        button-cart.buttonCart(v-if="!isAdmin")
        button-logout.buttonLogout
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ButtonCart from './button/ButtonCart.vue'
import User from '@/model/user/User'
import ButtonLogout from './button/ButtonLogout.vue'

export default defineComponent({
    components: {
        ButtonCart,
        ButtonLogout,
    },
    props: [],
    computed: {
        user(): User{return this.$store.state.userStore.user;},
        isAdmin(){return this.user?.role == 'admin';}
    },
    methods: {
        toHome(){
            this.$router.push('/');
        },
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
    cursor: pointer

.buttonCart
    margin-right: 24px

.buttons
    display: flex
    flex-direction: row
    position: absolute
    right: 32px
</style>