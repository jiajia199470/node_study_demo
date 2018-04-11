/**
 * Created by Administrator on 2018/4/10.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//链接MongoDB数据库
var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    user: 'root',
    pass: '123456'
};

var url = 'mongodb://127.0.0.1:28017/imoocmall';//数据库地址

mongoose.connect(url,options);

mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
});
//查询商品列表数据
router.get("/list", function (req,res,next) {
    let page = parseInt(req.param("page"));//获取参数
    let pageSize = parseInt(req.param("pageSize"));
    let priceLevel = req.param("priceLevel");
    let sort = req.param("sort");
    let skip = (page-1)*pageSize;
    var priceGt = '',priceLte = '';
    let params = {};
    if(priceLevel!='all'){
        switch (priceLevel){
            case '0':priceGt = 0;priceLte=100;break;
            case '1':priceGt = 100;priceLte=500;break;
            case '2':priceGt = 500;priceLte=1000;break;
            case '3':priceGt = 1000;priceLte=5000;break;
        }
        params = {
            salePrice:{
                $gt:priceGt,
                $lte:priceLte
            }
        }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);//skip(n) 跳过n条数据
    goodsModel.sort({'salePrice':sort});//sort -1是降序 1是升序
    goodsModel.exec(function (err,doc) {//排序需要用调用exec执行结果，不能再用find
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            });
        }
    })
});

/*提交数据，加入购物车*/
router.post('/addCart', function(req, res, next) {
    var userId = '100000077',
        productId = req.body.productId;
    var User = require('../models/user');
    User.findOne({userId:userId},function (err,userDoc) {
        if(err){
            res.json({
                status:"1",
                msg:err.message
            });
        }else {
            // console.log('userDoc:'+userDoc);
            if(userDoc){
                Goods.findOne({productId:productId},function (goodsErr,goodsDoc) {
                    console.log('goodsDoc：'+goodsDoc);
                    if (goodsErr){
                        res.json({
                            status:"1",
                            msg:goodsErr.message
                        })
                    }else {
                        if(goodsDoc){
                            let goodsItem ='';
                            //遍历，用户是否已有商品
                            userDoc.cartList.forEach(function (item) {
                                if(item.productId == productId){
                                    goodsItem = item;
                                    item.productNum ++;
                                }
                            });

                            //判断用户是否已有商品
                            if(goodsItem){//已有商品

                                userDoc.save(function (saveErr, saveDoc) {
                                    if (saveErr) {
                                        res.json({
                                            status: "1",
                                            msg: saveErr.message
                                        })
                                    } else {
                                        res.json({
                                            status: "0",
                                            msg: "",
                                            result: 'success'
                                        })
                                    }
                                })

                            }else {//插入新纪录

                                goodsDoc.productNum = 1;
                                goodsDoc.checked = 1;
                                userDoc.cartList.push(goodsDoc);
                                userDoc.save(function (saveErr, saveDoc) {
                                    if (saveErr) {
                                        res.json({
                                            status: "1",
                                            msg: saveErr.message
                                        })
                                    } else {
                                        res.json({
                                            status: "0",
                                            msg: "",
                                            result: 'success'
                                        })
                                    }
                                })

                            }
                        }
                    }
                });
            }
        }
    });
});

module.exports = router;
