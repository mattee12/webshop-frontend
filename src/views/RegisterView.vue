<template lang="pug">
div.view
    div.wrapper
        div.title
            h1 create account
        div.content
            div.inputWrapper
                input(type="text" :class="`${errors.email?'invalid':''}`" placeholder="email" v-model="email")
                p.error {{ errors.email }}
            div.inputWrapper
                input(type="password" :class="`${errors.password?'invalid':''}`" placeholder="password" v-model="password")
                p.error {{ errors.password }}
            div.buttonWrapper
                p.button(@click="register") register
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import FormErrors from '@/model/auth/FormErrors';
import { mapMutations } from 'vuex';

export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
            errors: new FormErrors(),
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
        attemptLogin(){
            this.api.post('/auth/login', {
                email: this.email,
                password: this.password,
            }).then(response => {
                this.errors = new FormErrors();
                this.login(response.data.user);
                this.$router.push('/');
            }).catch(error => {
                if(error.response.status === 400){
                    this.errors = new FormErrors(error.response.data);
                }
            });
        },
        register(){
            this.api.post('/', {
                email: this.email,
                password: this.password,
            }).then(response => {
                this.errors = new FormErrors();
                this.login(response.data.user);
                this.$router.push('/');
            }).catch(error => {
                if(error.response.status === 400){
                    this.errors = new FormErrors(error.response.data);
                }
            });
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

.content input
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
    color:blue
    font-size: 24px
    cursor: pointer

.error
    font-size: 16px
    color: red
    margin-top: 4px
    align-self: flex-start
    height: 18px
</style>
