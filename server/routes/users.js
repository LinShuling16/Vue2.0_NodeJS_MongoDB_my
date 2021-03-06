var express = require('express');
var router  = express.Router();
var User    = require('./../models/users');

require('./../util/util');

//路由文件里的是二级路由

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('test');
});

//登录接口
router.post('/login', function(req, res, next){
    var param = {
        userName : req.body.userName,
        userPwd  : req.body.userPwd
    }
    User.findOne(param, function(err, doc){
        console.log(err);
        console.log(doc);
        if(err){
            res.json({
                status : '1',
                msg    : err.message
            });
        }else{
            if(doc){
                //cookie处理
                res.cookie("userId", doc.userId,{
                    path   : '/',
                    maxAge : 1000*60*60
                });
                res.cookie("userName", doc.userName,{
                    path   : '/',
                    maxAge : 1000*60*60
                });
                //session处理
                // req.session.user = doc;

                res.json({
                   status : '0',
                   msg    : '',
                   result : {
                        userName:doc.userName
                   }
                });
            }
        }
    })
})

//登出接口
router.post("/logout", function(req, res, next){
    res.cookie("userId", "", {
        path : "/",
        maxAge: -1
    })
    res.cookie("userName", "", {
        path : "/",
        maxAge: -1
    })
    res.json({
        status : "0",
        msg    : '',
        result : ''
    })
});

//判断是否登录
router.get("/checkLogin", function(req, res, next){
    if(req.cookies.userId){
        res.json({
            status : '0',
            msg    : '已登录',
            result: req.cookies.userName
        })
    }else{
        res.json({
            status : '1',
            msg  : '未登录',
            result: ''
        })
    }
})

//查询当前用户的购物车数据
router.get('/cartList', function(req, res, next){
    var userId = req.cookies.userId;
    User.findOne({userId:userId}, function(err, doc){
        if(err){
            res.json({
                status : '1',
                msg    : err.message,
                result : ''
            });
        }else{
            if(doc){
                res.json({
                    status : '0',
                    msg    : '',
                    result : doc.cartList
                });
            }
        }
    });
});

//购物车删除
router.post("/cartDel", function(req, res, next){
    var userId    = req.cookies.userId;
    var productId = req.body.productId;

    User.update({
        userId : userId
    },{
        $pull : {
            'cartList' : {
                'productId' : productId
            }
        }
    }, function(err, doc){
        if(err){
            res.json({
                status : '1',
                msg    : err.message,
                result : ''
            });
        }else{
            res.json({
                status : '0',
                msg    : '',
                result : 'success'
            })
        }
    })
})

//购物车页面编辑
router.post("/cartEdit", function(req, res, next){
    var userId     = req.cookies.userId;
    var productId  = req.body.productId;
    var productNum = req.body.productNum;
    var checked    = req.body.checked;

    User.update({
        "userId" : userId,
        "cartList.productId" : productId
    },{
        "cartList.$.productNum" : productNum,
        "cartList.$.checked"    : checked
     }, function(err, doc){
        if(err){
            res.json({
                status : "1",
                msg    : err.message,
                result : ""
            })
        }else{
            res.json({
                status : "0",
                msg    : "",
                result : "success"
            })
        }
    })
})

//购物车全选
router.post("/editCheckAll", function(req, res, next){
    var userId = req.cookies.userId;
    var checked = req.body.checkAll ? '1' : '0';
    User.findOne({userId : userId}, function(err, user){
        if(err){
            res.json({
                status : '1',
                msg    : err.message,
                result : ''
            });
        }else{
            if(user){
                user.cartList.forEach((item) =>{
                    item.checked = checked;
                })
                user.save(function(err1, doc){
                    if(err1){
                        res.json({
                            status : '1',
                            msg    : err.message,
                            result : ''
                        })
                    }else{
                        res.json({
                            status : '0',
                            msg    : '',
                            result : 'success'
                        })
                    }
                })
            }
        }
    })
})

//用户地址
router.get("/addressList", function(req, res, next){
    var userId = req.cookies.userId;
    User.findOne({userId : userId}, function(err, doc){
        if(err){
            res.json({
                status : '1',
                msg    : err.message,
                result : ''
            });
        }else{
            res.json({
                status : '0',
                msg    : '',
                result : doc.addressList
            });
        }
    })
})

//设置默认地址接口
router.post("/setDefault", function(req, res, next){
    var userId    = req.cookies.userId;
    var addressId = req.body.addressId;

    if(!addressId){
        res.json({
            status : "1003",
            msg    : "addressId is null",
            result : ''
        });
    }else{
        User.findOne({userId : userId}, function(err, doc){
            if(err){
                res.json({
                    status : "1",
                    msg    : ree.message,
                    result : ''
                });
            }else{
                var addressList = doc.addressList;
                addressList.forEach((item) => {
                    if(item.addressId == addressId){
                        item.isDefault = true;
                    }else{
                        item.isDefault = false;
                    }
                });
                doc.save(function(err1, doc1){
                    if(err){
                        res.json({
                            status : "1",
                            msg    : err.message,
                            result : ''
                        })
                    }else{
                        res.json({
                            status : "0",
                            msg    : "",
                            result : ''
                        });
                    }
                })
            }
        })
    }
})

//删除地址接口
router.post("/delAdderss", function(req, res, next){
    var userId    = req.cookies.userId;
    var addressId = req.body.addressId;

    User.update({
        userId : userId
    }, {
        $pull: {
            'addressList' : {
                'addressId' : addressId
            }
        }
    }, function(err, doc){
        if(err){
            res.json({
                status : '1',
                msg    : err.message,
                result : ''
            });
        }else{
            res.json({
                status : '0',
                msg    : 'success',
                result : ''
            });
        }
    })
})

//创建订单
router.post("/payMent", function(req, res, next){
    var userId     = req.cookies.userId;
    var orderTotal = req.body.orderTotal;
    var addressId  = req.body.addressId;
    User.findOne({userId:userId}, function(err, doc){
        if(err){
            res.json({
                status : "1",
                msg    : err.message,
                result : ""
            });
        }else{
            var address = '';
            var goodsList = [];
            //获取当前用户的地址信息
            doc.addressList.forEach((item) => {
                if(addressId == item.addressId){
                    address = item;
                }
            })

            //获取用户购物车的购买商品
            doc.cartList.filter((item) => {
                if(item.checked == '1'){
                    goodsList.push(item);
                }
            });

            var platform = '622';
            var r1  = Math.floor(Math.random() * 10);
            var r2  = Math.floor(Math.random() * 10);

            var sysDate   = new Date().Format('yyyyMMddhhmmss');
            var creatDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            var orderId   = platform + r1 + sysDate + r2;

            var order = {
                orderId     : orderId,
                orderTotal  : orderTotal,
                addressInfo : address,
                goodsList   : goodsList,
                orderStatus : '1',
                creatDate   : creatDate
            }

            doc.orderList.push(order);

            doc.save(function(err1, doc1){
                if(err1){
                    res.json({
                        status : "1",
                        msg    : err.message,
                        result : ''
                    });
                }else{
                    res.json({
                        status : '0',
                        msg    : '',
                        result : {
                            orderId    : order.orderId,
                            orderTotal : order.orderTotal
                        }
                    })
                }
            });
        }
    })
})

//根据订单Id查询订单信息
router.get("/orderDetail", function(req, res, next){
    var userId  = req.cookies.userId;
    var orderId = req.param("orderId");

    User.findOne({
        userId : userId
    }, function(err, userInfo){
        if(err){
            res.json({
                status : '1',
                msg    : err.message,
                result : ''
            });
        }else{
            var orderList = userInfo.orderList;
            if(orderList.length > 0){
                var orderTotal = 0;
                orderList.forEach((item) => {
                    if(item.orderId == orderId){
                        orderTotal = item.orderTotal;
                    }
                });

                if(orderTotal > 0){
                    res.json({
                        status : '0',
                        msg    : '',
                        result : {
                            orderId    : orderId,
                            orderTotal : orderTotal
                        }
                    })
                }else{
                     res.json({
                        status : '120002',
                        msg    : '无此订单',
                        result : ''
                    });
                }


            }else{
                res.json({
                    status : '120001',
                    msg    : '当前用户未创建订单',
                    result : ''
                });
            }
        }
    })
})

//查询购物车商品数量
router.get("/getCartCount", function(req, res, next){
    if(req.cookies && req.cookies.userId){
        var userId = req.cookies.userId;
        User.findOne({
            userId : userId
        },function(err, doc){
            if(err){
                res.json({
                    status : '1',
                    msg    : err.message,
                    result : ''
                });
            }else{
                var cartList = doc.cartList;
                let cartCount = 0;
                cartList.map(function(item){
                    cartCount += parseInt(item.productNum);
                });
                res.json({
                    status : '0',
                    msg    : '',
                    result : cartCount
                })
            }
        })
    }
})

module.exports = router;