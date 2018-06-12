var express = require('express');
var router = express.Router();

//路由文件里的是二级路由

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('test');
});

module.exports = router;
