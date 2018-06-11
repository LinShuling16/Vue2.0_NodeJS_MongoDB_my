/*
* @Author: linshuling
* @Date:   2018-06-11 20:53:15
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-11 21:02:34
*/
let http = require('http');
let util = require('util');

http.get('http://www.imooc.com/u/card', (res)=>{
    let data = '';

    res.on("data", (chunk)=>{
        data += chunk;
    });

    res.on("end", ()=>{
        let result = JSON.parse(data);
        console.log("result:" + result.msg);
    })
});