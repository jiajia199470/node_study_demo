<template>
    <div>
        <svgIcon></svgIcon>
        <nav-header></nav-header>
        <bread>
            <span>My Cart</span>
        </bread>
        <div class="container">
            <div class="cart">
                <div class="page-title-normal">
                    <h2 class="page-title-h2"><span>My Cart</span></h2>
                </div>
                <div class="item-list-wrap">
                    <div class="cart-item">
                        <div class="cart-item-head">
                            <ul>
                                <li>Items</li>
                                <li>Price</li>
                                <li>Quantity</li>
                                <li>Subtotal</li>
                                <li>Edit</li>
                            </ul>
                        </div>
                        <ul class="cart-item-list">

                            <li v-for="(item,index) in cartList">
                                <div class="cart-tab-1">
                                    <div class="cart-item-check">
                                        <a href="javascipt:;" class="checkbox-btn">
                                            <svg class="check-ok">
                                                <use xlink:href="#icon-ok"></use>
                                            </svg>
                                        </a>
                                    </div>
                                    <div class="cart-item-pic">
                                        <img v-bind:src="'/static/'+item.productImage">
                                    </div>
                                    <div class="cart-item-title">
                                        <div class="item-name">{{ item.productName }}</div>
                                    </div>
                                </div>
                                <div class="cart-tab-2">
                                    <div class="item-price">{{ item.salePrice}}</div>
                                </div>
                                <div class="cart-tab-3">
                                    <div class="item-quantity">
                                        <div class="select-self select-self-open">
                                            <div class="select-self-area">
                                                <a class="input-sub">-</a>
                                                <span class="select-ipt">{{ item.productNum }}</span>
                                                <a class="input-add">+</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cart-tab-4">
                                    <div class="item-price-total">{{ item.productNum * item.salePrice  }}</div>
                                </div>
                                <div class="cart-tab-5">
                                    <div class="cart-item-opration">
                                        <a href="javascript:;" class="item-edit-btn">
                                            <svg class="icon icon-del">
                                                <use xlink:href="#icon-del"></use>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="cart-foot-wrap">
                    <div class="cart-foot-inner">
                        <div class="cart-foot-l">
                            <div class="item-all-check">
                                <!--<a href="javascipt:;">-->
                                      <!--<span>-->
                                          <!--<svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>-->
                                      <!--</span>-->
                                    <!--<span>Select all</span>-->
                                <!--</a>-->
                            </div>
                        </div>
                        <div class="cart-foot-r">
                            <div class="item-total">
                                Item total: <span class="total-price">500</span>
                            </div>
                            <div class="btn-wrap">
                                <a class="btn btn--red">Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>
<style>
    .input-sub,.input-add{
        min-width: 40px;
        height: 100%;
        border: 0;
        color: #605F5F;
        text-align: center;
        font-size: 16px;
        overflow: hidden;
        display: inline-block;
        background: #f0f0f0;
    }
    .item-quantity .select-self-area{
        background:none;
        border: 1px solid #f0f0f0;
    }
    .item-quantity .select-self-area .select-ipt{
        display: inline-block;
        padding:0 3px;
        width: 30px;
        min-width: 30px;
        text-align: center;
    }
    .check-ok{
        width: 20px;
        height: 20px;
    }
</style>
<script>
    import NavHeader from '../components/NavHeader.vue'
    import NavFooter from '../components/NavFooter.vue'
    import Bread from '../components/Bread.vue'
    import Modal from '../components/Modal.vue'
    import svgIcon from  '../components/svgIcon.vue'
    export default{
        data(){
            return{
                cartList:[]
            }
        },
        components:{
            NavHeader,
            NavFooter,
            Bread,
            Modal,
            svgIcon
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                var url = process.env.API_HOST +'/users/cartList';
                this.$http.get(url).then((response)=>{
                    let res = response.data;
                    this.cartList = res.result.cartList;
                });
            }
        }
    }
</script>
