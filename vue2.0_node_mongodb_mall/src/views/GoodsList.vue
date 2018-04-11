<script src="../../../../webpack_sample_project/webpack.config.js"></script>
<template>
<div>
    <nav-header></nav-header>
    <bread>
        <span>Goods</span>
    </bread>
    <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter" v-bind:class="{ 'filterby-show':filterBy }">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)" v-bind:class="{ 'cur' : priceChecked == 'all'}" @click="priceChecked = 'all'">All</a></dd>
                        <dd v-for="(price,index) in priceFilter">
                            <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked == index }">{{ price.startPrice}} - {{ price.endPrice }}</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="(item,index) in goodsList">
                                <div class="pic">
                                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{ item.productName }}</div>
                                    <div class="price">{{ item.prodcutPrice }}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                            <!--<li>-->
                                <!--<div class="pic">-->
                                    <!--<a href="#"><img src="static/2.jpg" alt=""></a>-->
                                <!--</div>-->
                                <!--<div class="main">-->
                                    <!--<div class="name">XX</div>-->
                                    <!--<div class="price">1000</div>-->
                                    <!--<div class="btn-area">-->
                                        <!--<a href="javascript:;" class="btn btn&#45;&#45;m">加入购物车</a>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</li>-->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
</div>
</template>

<script type="text/ecmascript-6">
//    import '@/assets/css/base.css'
//    import '@/assets/css/checkout.css'
//    import '@/assets/css/login.css'
//    import '@/assets/css/product.css'

    import NavHeader from '../components/NavHeader.vue'
    import NavFooter from '../components/NavFooter.vue'
    import Bread from '../components/Bread.vue'

    import axios from 'axios'

    export default{
        data(){
            return {
                goodsList:[],
                sortFlag:true,
                page:1,
                pageSize:8,
                busy:true,
                priceFilter:[
                    {
                        startPrice:'0.00',
                        endPrice:'500.00'
                   },
                    {
                        startPrice:'500.00',
                        endPrice:'1000.00'
                    },
                    {
                        startPrice:'1000.00',
                        endPrice:'2000.00'
                    },

                ],
                priceChecked:'all',
                filterBy:false,
                overLayFlag:false,
            }
        },
        components:{
            NavHeader,
            NavFooter,
            Bread
        },
        mounted:function () {
            this.getGoodsList();
        },
        methods:{

            /*商品列表数据*/
            getGoodsList(flag){
                var param = {
                    page:this.page,
                    pageSize:this.pageSize,
                    sort:this.sortFlag?1:-1,
                    priceLevel:this.priceChecked
                };
                this.loading = true;
                axios.get("http://127.0.0.1:3000/goods/list",{
                    params:param
                }).then((response)=>{
                    var res = response.data;
                    this.loading = false;
                    if(res.status=="0"){
                        if(flag){
                            this.goodsList = this.goodsList.concat(res.result.list);

                            if(res.result.count==0){
                                this.busy = true;
                            }else{
                                this.busy = false;
                            }
                        }else{
                            this.goodsList = res.result.list;
                            this.busy = false;
                        }
                    }else{
                        this.goodsList = [];
                    }
                });
            },
            setPriceFilter(index){
                this.priceChecked = index;
                this.closePop();
            },

            showFilterPop(){
                this.filterBy = true;
                this.overLayFlag = true;

            },
            closePop(){
                this.filterBy = false;
                this.overLayFlag = false;
            },
            addCart(productId){
                axios.post('http://127.0.0.1:3000/goods/addCart',{productId:productId}).then((res)=>{
                    if(res.status == 0){
                        alert("加入失败")
                    }else {
                        alert("加入成功")
                    }
                });
            }

        }
    }
</script>

<style>

</style>