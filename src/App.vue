<template>
  <router-view/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>
<style lang="stylus">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: black
  width: 100%

*
  margin: 0px
  user-select: none

body
  min-height: 100vh
  width: 100vw
  overflow-x: hidden
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
</style>
