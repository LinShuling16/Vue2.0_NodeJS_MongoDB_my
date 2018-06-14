/*
* @Author: linshuling
* @Date:   2018-06-13 15:14:28
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-14 15:40:27
* 
*/

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall');
//连接成功
mongoose.connection.on('connected', function(){
    console.log("MongoDB connected success.");
})
//连接失败
mongoose.connection.on('error', function(){
    console.log("MongoDB connected fail.");
})
//断开连接
mongoose.connection.on('disconnected', function(){
    console.log("MongoDB disconnected.");
})


//查询商品列表
router.get('/', function(req, res, next){
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));

    let sort = req.param('sort');
    let skip = (page-1)*pageSize;

    let params = {};
    let priceLevel = req.param('priceLevel');
    var priceGt  = '';
    var priceLte = '';
    if(priceLevel !== 'all'){
        switch(priceLevel){
            case '0' :
                priceGt  = 0;
                priceLte = 100;
            break;
            case '1' :
                priceGt  = 100;
                priceLte = 500;
            break;
            case '2' :
                priceGt  = 500;
                priceLte = 1000;
            break;
            case '3' :
                priceGt  = 1000;
                priceLte = 5000;
            break;
        }
        params = {
            salePrice: {
                $gt  : priceGt,
                $lte : priceLte
            }
        }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice' : sort});
    
    goodsModel.exec(function(err, doc){
        if(err){
            res.json({
                status: '1',
                msg   : err.messages 
            }) 
        }else{
            res.json({
                status : '0',
                msg    : '',
                result :{
                    count : doc.length,
                    list  : doc
                }
            });
        }
    })
})

//加入到购物车
router.post("/addCart", function(req, res, next){
    var userId = '100000077';
    var productId = req.body.productId;
    var User = require('../models/users');

    User.findOne({userId:userId}, function(err, userDoc){
        if(err){
            res.json({
                status : "1",
                msg    : err.message
            })
        }else{
            console.log("userDoc :" + userDoc);
            if(userDoc){
                let goodsItem = '';
                userDoc.cartList.forEach(function(item){
                    if(item.productId == productId){
                        goodsItem = item;
                        item.productNum ++;
                    }
                });
                if(goodsItem){
                    userDoc.save(function(err2, doc2){
                        if(err2){
                            res.json({
                                status : "1",
                                msg    : err2.message
                            })
                        }else{
                            res.json({
                                status : "0",
                                msg    : "",
                                result : "success"
                            })
                        } 
                    })
                }else{
                    Goods.findOne({productId:productId}, function(err1, doc){
                        if(err1){
                            res.json({
                                status : '1',
                                msg    : err1.message
                            })
                        }else{
                            if(doc){
                                doc.productNum = 1;
                                doc.checked    = 1;
                                userDoc.cartList.push(doc);
                                userDoc.save(function(err2, doc2){
                                     if(err2){
                                        res.json({
                                            status : "1",
                                            msg    : err2.message
                                        })
                                     }else{
                                        res.json({
                                            status : "0",
                                            msg    : "",
                                            result : "success"
                                        })
                                     } 
                                })
                            }
                        }
                    })
                }
            }
        }
    })
})

module.exports = router;