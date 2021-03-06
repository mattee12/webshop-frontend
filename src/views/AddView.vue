<template lang="pug">
div.view
    app-bar
    div.wrapper
        div.title
            h1 create item
        div.content
            form(@submit.prevent="attemptCreate")
                div.inputWrapper
                    input(type="text" :class="`${errors.name?'invalid':''}`" placeholder="name*" v-model="item.name")
                    p.error {{ errors.name }}
                div.inputWrapper
                    input(type="number" :class="`${errors.price?'invalid':''}`" placeholder="price* ($)" min="1" v-model="item.price")
                    p.error {{ errors.price }}
                div.inputWrapper
                    textarea.description(:class="`${errors.description?'invalid':''}`" placeholder="description" v-model="item.description")
                    p.error {{ errors.description }}
                div.buttonWrapper
                    input.button.cancel(type="button" @click="cancel" value="cancel")
                    div(style="width: 24px;")
                    input.button.create(type="submit" @click="attemptCreate" value="create")
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import FormItemAddErrors from '@/model/shop/FormItemAddErrors';
import AppBar from '@/components/general/appbar/AppBar.vue';
import ShopItem from '@/model/shop/ShopItem';

export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
            errors: new FormItemAddErrors(),
            api: axios.create({
                baseURL: 'http://localhost:8080/item',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            item: new ShopItem(),
        }
    },
    components: {
        AppBar,
    },
    methods: {
        attemptCreate(){
            this.api.post('/', this.item).then(() => {
                this.errors = new FormItemAddErrors();
                this.$router.push('/');
            }).catch(error => {
                if(error.response.status === 400){
                    this.errors = new FormItemAddErrors(error.response.data);
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
    min-height: 360px
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
    padding: 24px

.description
.content input[type="text"], input[type="number"]
    border: 1px solid black
    border-radius: 0px
    padding: 8px
    width: 240px
    font-size: 20px

.description.invalid
.content input.invalid
    color: red
    border: 1px solid red

.description.invalid::placeholder
.content input.invalid::placeholder
    color: #ff5a5a

.description.invalid:focus
.content input.invalid:focus
    border: 1px solid red
    outline: 1px solid red

.description:focus
.content input:focus
    outline: 1px solid black
    border-radius: 0px

.inputWrapper
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    margin-bottom: 8px
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
    &.create
        color: blue
    &.cancel
        color: red

.description
    resize: none
    width: 240px
    height: 120px
.error
    font-size: 16px
    color: red
    margin-top: 4px
    align-self: flex-start
    min-height: 18px
    max-width: 258px
    text-align: left

form
    display: flex
    flex-direction: column
    align-items: center
</style>
