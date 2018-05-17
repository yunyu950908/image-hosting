## ioly 一张床

> 写在前面，这个项目的代码适合跟我一样的萌新一遍学习一边写代码，可能在大佬眼中这种代码惨不忍睹，然而对我等小萌新来说还是略有学习价值的~

emmmmm... 第一次用 react + express 做了个稍微有点儿用的东西 —— 图床。

好了言归正传，说起图床这个东西，肯定有人想说 “他喵的做这玩意儿干啥，微博图床不好用咩~七牛不好使咩~ SM 也不错吖~”

当然好用，然而直到我发现上传至微博图床的图片在某些不知所以然的情况下就挂了，挂了... 好用但是不稳定有毛线用啊。七牛确实又好用又稳定，然而这货过于偏向程序猿，普通人用起来贼不方便 =。= 

那么有木有好用又稳定，操作还灵巧方便的图床捏~就本宝宝目前看来，并没有遇见特别满意的，比如 A 图床的 xxx 功能很喜欢，却没有 B 图床的 yyy 功能方便，又不够 C 图床的稳定性，还差了点 D 图床的容量... 

没错，有优点，有缺点。总有喜欢的地方，却又总少了一些什么 ┑(￣Д ￣)┍

既然这样，那就把他们整合到一起嘛~ 于是乎，本宝宝决定做一个聚合图床，啦啦啦~ 虽然现在才写了第一版，不过之后有机会会慢慢填坑，也希望跟我一样的码畜萌新有时间的一起写写哈~ emmmm, 虽然目前代码结构稍乱，后续一定会整理一下下的呢~

这算本宝宝第一次正儿八经的用 react (上一次是在半年前抄了个官网demo 2333333)，这回又从头开始撸了一遍官网文档和官方 tutorial demo ，然后开始写这玩意儿，中途遇到各种光看文档搞不定的坑基本都是靠参考 github 上各种开源项目代码，人家练手的小 demo 代码以及 Stack Overflow react-china 等社区搞定的，果然社区的力量是伟大的~

第一次接触 react-router-dom, redux，刚开始撸文档写 demo 的时候都挺容易的，想着 “哇~ 这文档写的真棒，简直深入浅出啊~”，等到和 react 丢一起 fuck 代码的时候 “我去，怎么会这样！？我靠，代码去哪儿了！？我的天！我的代码，你快肥来~”

不过虽说过程中很多磕磕碰碰，目前代码组织的也不是很好，不过至少第一版已经完成的差不多了，其中的缺陷和深坑之后再填吧，毕竟图床这玩意儿还是有点用的，应该不会跟以前一样仿个东西写完就丢了=。=

哎哟，突然想到 node 我几乎也是第一次正儿八经地写 23333333，然而不得不说的是，虽然写的烂了一点，还是蛮有成就感的，而且还挺好玩儿的~ 至少不用管样式，前端调样式简直要炸天啊！！！ 

唠嗑了这么多，说点这图床的东西吧。。

### 主要功能
1. 注册 （中规中矩，邮件验证 + pbkdf2 加密）
2. 登录 （鉴权用的 JWT，其实这种小项目用啥都一样）
3. 配置图床空间 （mongodb）
4. 上传图片获得外链（因为流量的原因直接在前端调提供商的 sdK 并没有在后端处理）
5. 查看历史记录 （还在施工，在考虑直接调 sdK 还是拿外链 + 图片便签存数据库）

### 后续可能添加的功能
1. 之前写了几个小爬虫，可能会把她们注册进来
2. 目前只有 leancloud 能配置，后续至少会添加七牛，以及看情况添加其他
3. 应该会添加按图片标签分类
4. 图片分享，把图片链接和标签描述丢进一个公共图片池
5. 用 es 处理数据，搞搞推荐之类的？
6. 阔以加个 websocket 推送分享？
7. 做个 Chrome 扩展集成一下
8. emmmm... 好像还蛮多功能可以加的

### 技术栈
> emmmm... 这玩意儿是不是就写写主要用了哪些包 =。=

#### 前端
1. react
2. redux
3. react-redux
4. redux-thunk
5. react-router-dom (这货最难用 ☹️，还是 vue 路由写的爽)
6. react-router-redux
7. antd
8. axios
9. clipboard
10. leancloud-storage
11. SCSS
12. IED - JetBrains(WebStrom)
13. 其他

#### 后端
1. node
2. express
3. mongodb
4. mongoose
5. redis
6. ioredis
7. cors
8. jsonwebtoken
9. nodemailer (发邮件的)
10. winston (写日志的)
11. pbkdf2
12. IED - JetBrains(WebStrom)
13. centOS7

### 目录结构
#### 前端
```bash
.
├── index.jsx
├── App
├── components
│   ├── alert_info.jsx
│   ├── footer_dom.jsx
│   ├── header_dom.jsx
│   ├── main_dom.jsx
│   ├── image_upload_page
│   ├── my_uploaded_page
│   ├── storage_setting_page
│   ├── user_center_page
├── redux
│   ├── actions
│   ├── constants
│   ├── middlewares
│   ├── reducers
│   └── store
├── request
└── utils
    ├── history.js
    ├── leancloud
    ├── logger.js
    └── verify
```

### 后端
```bash
.
├── app.js
├── bin
│   └── www
├── config
│   ├── cipher
│   │   ├── jwt_config.js
│   │   └── password_config.js
│   └── setting
│       └── index.js
├── doc
├── errors
│   ├── error_code.js
│   ├── http_base_error.js
│   ├── http_request_param_error.js
│   ├── internal_server_error.js
│   ├── login_error.js
│   ├── no_auth_error.js
│   └── resource_not_found_error.js
├── logs
│   ├── app
│   ├── redis
│   └── req
├── middlewares
│   ├── auth.js
│   ├── error_handler.js
│   └── http_error_handler.js
├── models
│   └── user.js
├── package-lock.json
├── package.json
├── public
├── routes
│   ├── index.js
│   └── user.js
├── services
│   ├── common_service.js
│   ├── jwt_service.js
│   ├── mail_service.js
│   ├── mongoose_service.js
│   ├── redis_service.js
│   └── user.js
├── test
├── utils
│   ├── api_response.js
│   └── loggers
│       ├── loggerGenerator.js
│       └── logsMeta.js
└── views

```

### 项目预览

[预览看这里 http://image.ioly.top/](http://image.ioly.top/)

### 求（pian） star

各位善良可爱小哥哥小姐姐，既然都已经看到这里了那就点个 star 鼓励一下呗~

平时 vue 写的比较多，第一次写 react 难免会差一些，但是如果有了 star 的鼓励，本宝宝一定会继续努力加油，以各位小哥哥小姐姐为榜样，好好学习，天天向上！
> 噗~ 为了骗个小星星也真不容易哎 =。= 

> PS: 如果有大佬看了代码的，希望给点建议。好让我针对性地去学点东西改进改进~ 么么哒~ 有其他问题可以联系邮箱 ioly@ioly.top
