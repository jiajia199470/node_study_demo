/**
 * Created by Administrator on 2018/4/10.

 Schema主要用于定义MongoDB中集合Collection里文档document的结构　　

 定义Schema非常简单，指定字段名和类型即可，支持的类型包括以下8种
 String      字符串
 Number      数字
 Date        日期
 Buffer      二进制
 Boolean     布尔值
 Mixed       混合类型
 ObjectId    对象ID
 Array       数组
 */



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
 "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "salePrice":String,
      "productImage":String,
      "checked":String,
      "productNum":String
    }
  ],
  "addressList":[
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    }
  ]
});

module.exports = mongoose.model("User",userSchema);