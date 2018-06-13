/*
* @Author: linshuling
* @Date:   2018-06-13 14:08:22
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-13 15:13:24
*/

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var productSchema = new Schema({
    "productId"    : String,
    "productName"  : String,
    "salePrice"    : Number,
    "productImage" : String
});

module.exports = mongoose.model("Good", productSchema);