<template lang="pug">
div.pager
    div.content
        slot
    div.footer
        div.backWrapper
            p.back(v-if="page > 1" @click="$emit('page-selected', page-1)") {{'<'}}
        div.buttonWrapper
            p.button(v-for="n in pages" @click="$emit('page-selected', n)" :class="`${n == page ? 'selected': ''}`") {{n}}
        div.nextWrapper
            p.next(v-if="page < totalPages" @click="$emit('page-selected', page+1)") {{'>'}}
</template>
<script lang="ts">
import { defineComponent } from 'vue'
    export default defineComponent({
        props: {
            page: {
                type: Number,
                required: true,
                default: 1,
            },
            pageSize: {
                type: Number,
                required: true,
                default: 1,
            },
            totalItems: {
                type: Number,
                required: true    
            },
            maxPages: {
                type: Number,
                default: 3,
                required: true,
            },
        },
        computed: {
            totalPages(){return Math.ceil(this.totalItems / this.pageSize);},
            startPage(){
                if(this.totalPages <= this.maxPages) {
                    return 1;
                }

                let maxPagesBeforeCurrentPage = Math.floor(this.maxPages / 2);
                let maxPagesAfterCurrentPage = Math.ceil(this.maxPages / 2) - 1;
                if(this.page <= maxPagesBeforeCurrentPage) {
                    return 1;
                }
                if(this.page + maxPagesAfterCurrentPage >= this.totalPages) {
                    return this.totalPages - this.maxPages + 1;
                }
                return this.page - maxPagesBeforeCurrentPage;
            },
            endPage(){
                if(this.totalPages <= this.maxPages) {
                    return this.totalPages;
                }
                let maxPagesBeforeCurrentPage = Math.floor(this.maxPages / 2);
                let maxPagesAfterCurrentPage = Math.ceil(this.maxPages / 2) - 1;
                if(this.page <= maxPagesBeforeCurrentPage) {
                    return this.maxPages;
                }
                if(this.page + maxPagesAfterCurrentPage >= this.totalPages) {
                    return this.totalPages;
                }
                return this.page + maxPagesAfterCurrentPage;
            },
            startIndex(){return (this.page - 1) * this.pageSize + 1;},
            endIndex(){return Math.min(this.startIndex + this.pageSize - 1, this.totalItems);},
            pages(){return Array.from(Array((this.endPage + 1) - this.startPage).keys()).map(i => i + this.startPage);},
        },
        watch: {
            page(){
                if(this.page > this.totalPages) this.$emit('page-selected', this.totalPages);
                if(this.page < 1) this.$emit('page-selected', 1);
            }
        },
    })
</script>
<style lang="stylus" scoped>
.footer
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    height: 64px
    color: blue

.footer p
    margin-right: 16px
    cursor: pointer
    &:last-of-kind
        margin-right: 0

.buttonWrapper
.nextWrapper
.backWrapper
    display: flex
    flex-direction: row
    align-items: center

.nextWrapper
.backWrapper
    flex: 1

.nextWrapper
    justify-content: flex-start

.backWrapper
    justify-content: flex-end

.button.selected
    color: black
</style>

