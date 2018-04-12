<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title"></div>
                    <button class="md-close" @click="closeModal">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="message"></slot>
                    </div>
                    <div class="btn-warp btn-area">
                        <slot name="btnGroup"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
    </div>
</template>
<style>
    .btn-warp{
        text-align: center;
    }
</style>
<script>

    export default {
        props: ["mdShow"],
        data(){
            return {  //大括号要与return同一行
            }
        },
        methods:{
            closeModal(){
                this.$emit("close");
            }
        }
    }
</script>