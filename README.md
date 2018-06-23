# imooc_mall_my

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
```

### 一些记录
- vue-lazyload:图片懒加载。
- jade语法。
- pm2 : 通过进程的方式进行管理，启动服务后还可以在终端进行其他操作。
    + pm2 start server/bin/www
    + pm2 stop all
- Mongoose 是对 MongoDB 额封装。
- require 会自动去node_modules 模块里查找。
- 插件：vue-infinite-scroll 滚动加载。

### 一些问题
- 登录时，账号或是密码有误，后台有问题。
- 升降序图片缓存问题。
- 增加，修改地址没有实现。
- 没有选择地址时， addressId = 空。
- 没有商品详情页。
