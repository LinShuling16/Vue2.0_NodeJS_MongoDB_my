/*
* @Author: linshuling
* @Date:   2018-06-14 11:18:15
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-20 15:56:51
*/
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    "userId"    : String,
    "userName"  : String,
    "userPwd"   : String,
    "orderList" : Array,
    "cartList"  : [
        {
            "productId"    : String,
            "productName"  : String,
            "salePrice"    : Number,
            "productImage" : String,
            "productNum"   : Number,
            "checked"      : String
        }
    ],
    "addressList" : [
        {
          "addressId"  : String,
          "userName"   : String,
          "streetName" : String,
          "postCode"   : Number,
          "tel"        : String,
          "isDefault"  : Boolean
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
