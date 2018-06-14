/*
* @Author: linshuling
* @Date:   2018-06-13 14:08:22
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-14 13:52:27
*/

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var productSchema = new Schema({
    "productId"    : String,
    "productName"  : String,
    "salePrice"    : Number,
    "productImage" : String,
    "productNum"   : Number,
    "checked"      : String
});

module.exports = mongoose.model("Good", productSchema);