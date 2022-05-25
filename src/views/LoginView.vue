<template lang="pug">
div.view
    div.wrapper
        div.title
            h1 webshop login
        div.content
            form(@submit.prevent="handleLoginClicked")
                div.inputWrapper
                    input(type="text" :class="`${errors.email?'invalid':''}`" placeholder="email" v-model="email")
                    p.error {{ errors.email }}
                div.inputWrapper
                    input(type="password" :class="`${errors.password?'invalid':''}`" placeholder="password" v-model="password")
                    p.error {{ errors.password }}
                div.buttonWrapper
                    input.button(type="button" @click="register" value="register")
                    div(style="width: 24px;")
                    input.button(type="submit" @click="handleLoginClicked" value="login")
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import FormAuthErrors from '@/model/auth/FormAuthErrors';
import { mapMutations } from 'vuex';
import Auth from '@/model/auth/Auth';
import HelperAuth from '@/helper/HelperAuth';
import ResponseAuth from '@/model/auth/ResponseAuth';

export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
            errors: new FormAuthErrors(),
            api: axios.create({
                baseURL: 'http://localhost:8080/auth/login',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }
    },
    methods: {
        ...mapMutations(['login']),
        handleLoginClicked(){
            HelperAuth.attemptLogin(new Auth({email: this.email, password: this.password})).then( (response: ResponseAuth) => {
                if(response.isSuccessful()){this.$router.push('/'); return}
                this.errors = response.getErrors();
            });
        },
        register(){
            this.$router.push('/register');
        },
    },
});
</script>
<style lang="stylus" scoped>
.view
    display: flex
    align-content: center
    justify-content: center
.wrapper
    border: 4px solid black
    width: 360px
    height: 360px
    display: flex
    flex-direction: column
.title
    border-bottom: 2px solid black
    padding: 16px 0px
    font-size: 24px
.content
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    flex: 1

.content input[type="text"], input[type="password"]
    border: 1px solid black
    border-radius: 0px
    padding: 8px
    width: 240px
    font-size: 20px

.content input.invalid
    color: red
    border: 1px solid red

.content input.invalid::placeholder
    color: #ff5a5a

.content input.invalid:focus
    border: 1px solid red
    outline: 1px solid red

.content input:focus
    outline: 1px solid black
    border-radius: 0px

.inputWrapper
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    margin-bottom: 24px
.content .inputWrapper:last-of-type
    margin-bottom: 0px

.buttonWrapper
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    
.button
    background: none
    border: none
    outline: none
    color:blue
    font-size: 24px
    cursor: pointer
    font-family: Avenir, Helvetica, Arial, sans-serif
    padding: 0px

.error
    font-size: 16px
    color: red
    margin-top: 4px
    align-self: flex-start
    height: 18px
</style>
