<template lang="pug">
p(@click="handleLogout") logout
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import HelperAuth from '@/helper/HelperAuth'

export default defineComponent({
    methods: {
        handleLogout(){
            HelperAuth.logout();
        }
    }
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