/**
 * Created by Administrator on 2018/4/10.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;//通过mongoose.Schema来调用Schema，然后使用new方法来创建schema对象
var productSchema = new Schema({
    "productId":{type:String},
    "productName":String,
    "salePrice":Number,
    "checked":String,
    "productNum":Number,
    "productImage":String
});

// var  Schema = new mongoose.Schema({
//
// });//创建Schema对象

module.exports = mongoose.model('Good',productSchema);