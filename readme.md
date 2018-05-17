## ioly 一张床

emmmmm... 第一次用 react + express 做了个稍微有点儿用的东西 —— 图床。

这算我第一次正儿八经的用 react (上一次是在半年前)，从头开始撸了一遍官网文档和官方 tutorial demo 后开始写这玩意儿，中途遇到各种光看文档搞不定的坑基本都是靠参考 github 上各种开源项目代码，人家练手的小 demo 代码以及 Stack Overflow 搞定的，果然社区的力量是伟大的~

第一次接触 react-router-dom, redux 的时候，刚开始撸文档写 demo 的时候都挺容易的，想着 “哇~ 这文档写的真棒，简直深入浅出啊~”，等到和 react 丢一起写代码的时候 “我去，怎么会这样！？我靠，居然还能这样！？我的天！我的代码，你快肥来~ 宝宝需要你~”

虽说过程中很多磕磕碰碰，目前代码组织的也不是很好，不过至少第一版已经完成的差不多了，其中的缺陷和深坑之后再填吧，毕竟图床这玩意儿还是有点用的，应该不会跟以前一样写完就丢了=。=

哎哟，突然想到 node 我几乎也是第一次写 23333333，然而不得不说，虽然写的烂了一点，还是蛮有成就感的，而且还挺好玩儿的，写起来感觉比前端舒服啊~ 至少不用管样式，前端调样式简直要炸天啊！！！ CSS 这玩意太他喵喵咪咪的难！！！

### 主要功能
1. 注册
2. 登录
3. 配置图床空间
4. 上传图片获得外链（因为流量的原因直接在前端调提供商的 sdK 并没有在后端处理）
5. 查看历史记录

### 后续可能添加的功能
1. 之前写了几个小爬虫，可能会把她们注册进来
2. 目前只有 leancloud 能配置，后续至少会添加七牛，以及看情况添加其他
3. 按图片标签分类
4. 图片分享，把图片链接和标签描述丢进一个公共图片池
5. 用 es 处理数据，搞搞推荐之类的？

### 技术栈
> emmmm... 这玩意儿是不是就写写主要用了哪些包 =。=

#### 前端
1. react
2. redux
3. react-redux
4. redux-thunk
5. react-router-dom
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
9. nodemailer
10. winston
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
