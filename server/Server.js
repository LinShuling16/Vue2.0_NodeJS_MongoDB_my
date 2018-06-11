/*
* @Author: linshuling
* @Date:   2018-06-11 17:13:28
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-11 20:45:17
*/
let http = require('http');
let url = require('url');
let util = require('util');

let fs = require('fs');

let server = http.createServer((req,res)=>{
    // res.statusCode = 200;
    // res.setHeader("Content-Type","text/plain; charset=utf-8");

    var pathname = url.parse(req.url).pathname;
    fs.readFile(pathname.substring(1),(err,data) => {
        if(err){
            res.writeHead(404,{
                'Content-Type' : 'text/html'
            });
        }else{
            res.writeHead(200,{
                'Content-Type' : 'text/html'
            })
        }
        res.write(data.toString());
        
        res.end();
    });
   
});

server.listen(3001,'127.0.0.1', ()=>{
    console.log('runing, open:http://127.0.0.1:3001');
})