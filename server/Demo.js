/*
* @Author: linshuling
* @Date:   2018-06-11 16:12:13
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-11 16:51:58
*/
let user = require('./User');
console.log(`I'm ${user.userName},I say ${user.sayHello()}.`);

//创建服务器
//node HTTP模块使用
let http = require('http');

//URL模块
//解析请求的地址
let url = require('url');

let util = require('util');

let server = http.createServer((req,res) =>{
    res.statusCode = 200;

    res.setHeader("Content-Type","text/plain; charset=utf-8");

    res.end(util.inspect(url.parse(req.url)));
});

server.listen(3001,'127.0.0.1', ()=>{
    console.log('runing, open:http://127.0.0.1:3001');
})