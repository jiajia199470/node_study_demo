var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//登录
router.post('/login', function (req, res, next) {
    var params = {
        userName: req.param("userName"),//post方式用res.body取参数
        userPwd: req.param("userPwd")
    }
    User.findOne(params, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            });
        } else {
            if (doc) {
                //写入客户端cookie
                res.cookie("userId", doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60,//周期60分钟
                });
                res.cookie("userName", doc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60,//周期60分钟
                });
                // req.session.user = doc;//拿客户端提交的数据存到服务端的secction
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                })
            }
        }
    });

});

//登出
router.post("/logout",function (req,res,next) {
    res.cookie("userId","",{
        path:'/',
        maxAge:-1,//周期失效
    });
    res.cookie("userName", "" ,{
        path: '/',
        maxAge: -1,//周期60分钟
    });
    res.json({
        status:"0",
        msg:""
    });
});

router.get("/checkLogin",function (req,res,next) {
    if(req.cookies.userId){
        res.json({
            status:"0",
            msg:"",
            result:{
                userName:req.cookies.userName || ''
            }
        });
    }else {
        res.json({
            status:"0",
            msg:"",
            result:""
        });
    }
});

module.exports = router;
