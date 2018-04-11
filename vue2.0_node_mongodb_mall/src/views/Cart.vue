<template>
    <div>我是购物车
        <!--<span>{{ $route.params.cartId}}</span>-->
        <span>{{ $route.query.cartId}}</span>

    </div>

</template>

<script type="text/ecmascript-6">

    export default{
        data(){
            return{
                msg:"111"
            }
        }
    }
</script>

<style>