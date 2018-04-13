<template>
    <div>
        <svgIcon></svgIcon>
        <nav-header></nav-header>
        <bread>
            <span>Goods</span>
        </bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a href="javascript:void(0)" class="price" @click="sortGoods">
                        Price
                        <svg class="icon-arrow-short" v-bind:class="{'sort-up':sortFlag}">
                            <use xlink:href="#sort-up"></use>
                        </svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" v-bind:class="{ 'filterby-show':filterBy }">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd><a href="javascript:void(0)" v-bind:class="{ 'cur' : priceChecked == 'all'}" @click="setPriceFilter('all')">All</a></dd>
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
                                        <div class="price">{{ item.salePrice }}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m btn-m-hover" @click="addCart(item.productId)">加入购物车</a>
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

                        <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                            <!--<span>加载中...</span>-->
                            <svg v-show="loading" fill="#dd7479" width="64" height="64" >
                                <use xlink:href="#loading-spinning-bubbles"></use>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!--弹层-->
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>

        <!--加入购物车失败模态框-->
        <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
            <p slot="message">
                {{ addCartErrorMsg}} 没能加入购物车
            </p>
            <div slot="btnGroup">
                <a href="javascript:;" class="btn btn--m" @click="closeModal">关闭</a>
            </div>
        </modal>

        <!--成功加入购物车模态框-->
        <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">

            <p slot="message">
                <svg class="icon-ok" role="img">
                    <use xlink:href="#icon-ok"></use>
                </svg>
                成功加入购物车！
            </p>

            <div slot="btnGroup">
                <a href="javascript:;" class="btn btn--m" @click="closeModal">继续购物</a>
                <router-link class="btn btn--m" to="/cart" > 查看购物车</router-link>
            </div>
        </modal>

        <nav-footer></nav-footer>
    </div>
</template>
<style>
    .load-more{
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .btn-m-hover:hover{
        background-color: #ff8f94;
    }

    .icon-arrow-short{
        transition: all .3s  ease-out;
    }
    .sort-up{
        transform: rotate(180deg);
        transition: all .3s  ease-out;
    }

</style>
<script type="text/ecmascript-6">
    import NavHeader from '../components/NavHeader.vue'
    import NavFooter from '../components/NavFooter.vue'
    import Bread from '../components/Bread.vue'
    import Modal from '../components/Modal.vue'
    import svgIcon from  '../components/svgIcon.vue'

    export default{
        data(){
            return {
                goodsList:[],
                sortFlag:false,
                page:1,
                pageSize:8,
                busy:true,//v-infinite-scroll
                loading:false,
                mdShow:false,
                mdShowCart:false,
                addCartErrorMsg:'',
                priceFilter:[
                    {
                        startPrice:'0.00',
                        endPrice:'100.00'
                    },
                    {
                        startPrice:'100.00',
                        endPrice:'500.00'
                    },
                    {
                        startPrice:'500.00',
                        endPrice:'1000.00'
                    },
                    {
                        startPrice:'1000.00',
                        endPrice:'5000.00'
                    }
                ],
                priceChecked:'all',
                filterBy:false,
                overLayFlag:false,
                noMoreGoodsFlag:false,
            }
        },
        components:{
            NavHeader,
            NavFooter,
            Bread,
            Modal,
            svgIcon
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
                var url = process.env.API_HOST +'/goods/list';
                this.$http.get(url,{
                    params:param
                }).then((response)=>{
                    var res = response.data;
                    this.loading = false;
                    if(res.status=="0"){
                        if(flag){//滚动加载更多
                            this.goodsList = this.goodsList.concat(res.result.list);

                            if( res.result.count==0 ){//没有数据
                                this.busy = true;
                                this.noMoreGoodsFlag = true;
                            }else{
                                this.busy = false;
                                this.noMoreGoodsFlag = false;
                            }
                        }else{
                            this.goodsList = res.result.list;
                            this.busy = false;
                            this.noMoreGoodsFlag = false;
                        }
                    }else{
                        this.goodsList = [];
                    }
                });
            },

            /*升序降序*/
            sortGoods(){
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList();
            },

            setPriceFilter(index){
                this.priceChecked = index;
                this.closePop();
//                if(index=='all'){
//                    this.page = 1;
//                }
                this.page = 1;

                this.getGoodsList();
            },

            showFilterPop(){
                this.filterBy = true;
                this.overLayFlag = true;

            },

            /*关闭弹层*/
            closePop(){
                this.filterBy = false;
                this.overLayFlag = false;
            },

            addCart(productId){
                var url = process.env.API_HOST +'/goods/addCart';
                this.$http.post(url,{productId:productId}).then((response)=>{
                    let res = response.data;
                    if(res.status == 0){
//                        alert("加入成功！")
                        this.mdShowCart = true;
                    }else {
                        this.mdShow = true;
                        this.addCartErrorMsg = res.msg;
//                        alert(`msg:${res.msg}`);
                    }
                });
            },

            loadMore(){
                if(!this.noMoreGoodsFlag){
                    this.busy = true;//滚动加载失效
                    this.page++;
                    setTimeout(() => {
                        this.getGoodsList(true);
                        this.busy = false;
                    }, 1000);
                }
            },

            closeModal(){
                this.mdShow = false;
                this.mdShowCart = false;
            }

        }
    }
</script>

<style>

</style>