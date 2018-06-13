/*
* @Author: linshuling
* @Date:   2018-06-13 15:14:28
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-13 17:10:09
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

router.get('/', function(req, res, next){
    // res.send('hello, goods list');
    Goods.find({}, function(err, doc){
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

module.exports = router;