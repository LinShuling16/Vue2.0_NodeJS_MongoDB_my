var express = require('express');
var router  = express.Router();
var User    = require('./../models/users');

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

module.exports = router;
