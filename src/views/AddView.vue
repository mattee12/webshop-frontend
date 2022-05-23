<template lang="pug">
div.view
    app-bar
    div.wrapper
        div.title
            h1 create item
        div.content
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
                p.buttonCancel(@click="cancel") cancel
                div(style="width: 24px;")
                p.buttonCreate(@click="attemptCreate") create
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
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            token: localStorage.getItem('token')?.toString() ?? '',
            item: new ShopItem(),
        }
    },
    components: {
        AppBar,
    },
    methods: {
        attemptCreate(){
            this.api.post('/', this.item, {
                headers: {
                    'access-token': this.token,
                }
            }).then(() => {
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
.content input
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
.buttonCancel
    color:red
    font-size: 24px
    cursor: pointer
.buttonCreate
    color:blue
    font-size: 24px
    cursor: pointer

.description
    resize: none
    width: 240px
    height: 120px
.error
    font-size: 16px
    color: red
    margin-top: 4px
    align-self: flex-start
    height: 18px
</style>
