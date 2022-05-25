<template lang="pug">
div.view
    div.wrapper
        div.title
            h1 create account
        div.content
            form(@submit.prevent="register")
                div.inputWrapper
                    input(type="text" :class="`${errors.email?'invalid':''}`" placeholder="email" v-model="email")
                    p.error {{ errors.email }}
                div.inputWrapper
                    input(type="password" :class="`${errors.password?'invalid':''}`" placeholder="password" v-model="password")
                    p.error {{ errors.password }}
                div.buttonWrapper
                    input.button.cancel(type="button" @click="cancel" value="cancel")
                    div(style="width: 24px;")
                    input.button.register(type="submit" @click="register" value="register")
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import FormAuthErrors from '@/model/auth/FormAuthErrors';
import { mapMutations } from 'vuex';
import Auth from '@/model/auth/Auth';

export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
            errors: new FormAuthErrors(),
            api: axios.create({
                baseURL: 'http://localhost:8080/auth/register',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }
    },
    methods: {
        ...mapMutations(['login']),
        register(){
            this.api.post('/', new Auth({
                email: this.email,
                password: this.password,
            })).then(response => {
                this.errors = new FormAuthErrors();
                this.login(response.data.user);
                this.$router.push('/');
            }).catch(error => {
                if(error.response.status === 400){
                    this.errors = new FormAuthErrors(error.response.data);
                }
            });
        },
        cancel(){
            this.$router.push('/');
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
    &.register
        color: blue
    &.cancel
        color: red

.error
    font-size: 16px
    color: red
    margin-top: 4px
    align-self: flex-start
    height: 18px
</style>
