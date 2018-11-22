# koa-puppeteer
> 使用 Koajs,Docker,Puppeteer 设计的REST API服务，支持自定义截图，自定义PDF保存，JS渲染(用于爬虫或者代理),除了`render`路由，其他所有路由操作都是异步，加速业务运行


**部署/使用**

git clone

`git clone https://github.com/jiguang7/koa-puppeteer.git`

pull docker images

`docker pull alekzonder/puppeteer`

run images
务必在当起目录下，也就是git clone的地方

`docker run -d --name puppeteer -p 127.0.0.1:3200:3200 -v $PWD/koa-puppeteer/:/app/  alekzonder/puppeteer`

访问

http://127.0.0.1:3200

可用路由

- http://127.0.0.1:3200/screenshot
- http://127.0.0.1:3200/screenshot/full
- http://127.0.0.1:3200/pdf
- http://127.0.0.1:3200/render

实时日志

docker logs -f 容器名




**API**

> 所有接口以REST API的形式提供，方便分布式部署和维护

目前提供4个API接口

- screenshot 网页自定义截图
- screenshot/full 网页全屏截图
- pdf 网页自定义PDF保存
- render 渲染并序列化网页的HTML文本 

**全局参数**

- url 需要截图或者渲染的原始URL
- ticekt 公网部署的时候用于授权行为的`token`,默认没有启用，如需使用,请去掉注释`routes/api.js` 22,23行


**screenshot**

介绍

自定义截图路由

方法

支持HTTP所有方法，当请求当URL参数中存在`&`字符时，不要使用`GET`方法提交，因为后端获取参数值的时候会因为`&`当作是另外一个参数

参数

- width 在截图和PDF保存路由中使用，浏览器渲染的时候取的宽度，单位是像素
- heigth 在截图和PDF保存路由中使用，浏览器渲染的时候取的高度，单位是像素

请求

`http://testnet.io:3200/screenshot?url=https://360.cn&width=900&height=800`

响应

```
{"status":200,"error":"","message":"success screenshot","type":"screenshot","filename":"294cca10-a6cb-4fda-b919-00966fce1891.png"}
```

说明

- status 请求响应状态码，当且仅当是 `200`时请求成功
- error 当请求发生错误时的错误类型
- message 响应提示信息
- type 请求的路由类型
- filename 截图名称

保存目录

screenshot


效果

![koa-puppeteer](https://raw.githubusercontent.com/jiguang7/koa-puppeteer/master/screenshot/0203beb3-34b2-4b3d-a76f-2ebf591128a4.png)


**screenshot/full**

介绍

全屏截图路由

方法

支持HTTP所有方法，当请求当URL参数中存在`&`字符时，不要使用`GET`方法提交，因为后端获取参数值的时候会因为`&`当作是另外一个参数

参数

全局参数URL

请求

`http://testnet.io:3200/screenshot/full?url=https://360.cn`

响应

```
{"status":200,"error":"","message":"success fullscreenshot","type":"fullscreenshot","filename":"03b8cfda-d3d8-4661-88ea-a614517e44ae.png"}
```

说明

- status 请求响应状态码，当且仅当是 `200`时请求成功
- error 当请求发生错误时的错误类型
- message 响应提示信息
- type 请求的路由类型
- filename 截图名称

保存目录

fullscreenshot


效果

![koa-puppeteer](https://raw.githubusercontent.com/jiguang7/koa-puppeteer/master/fullscreenshot/e7071230-4a1c-4a10-97b6-18742787711f.png)


**pdf**

介绍

自定义PDF保存路由

方法

支持HTTP所有方法，当请求当URL参数中存在`&`字符时，不要使用`GET`方法提交，因为后端获取参数值的时候会因为`&`当作是另外一个参数

参数

- width 在截图和PDF保存路由中使用，浏览器渲染的时候取的宽度，单位是像素
- heigth 在截图和PDF保存路由中使用，浏览器渲染的时候取的高度，单位是像素
- format 自定义PDF格式，format 的优先级高于 width,height 如果设置了，将覆盖 width 和 height 配置 默认是 'Letter',可选 `Legal`, `A4` 等

请求

`http://testnet.io:3200/pdf?url=https://360.cn&width=900&height=800`

响应

```
{"status":200,"error":"","message":"success screenshot","type":"pdf","filename":"294cca10-a6cb-4fda-b919-00966fce1891.png"}
```

说明

- status 请求响应状态码，当且仅当是 `200`时请求成功
- error 当请求发生错误时的错误类型
- message 响应提示信息
- type 请求的路由类型
- filename PDF名称

保存目录

pdf

效果

`https://github.com/jiguang7/koa-puppeteer/blob/master/pdf/2a0d97e3-6377-47a1-a1c1-b81eda0c3e90.pdf`


**render**

介绍

提供JS渲染过后的HTML文本，可用于爬虫和代理

方法

支持HTTP所有方法，当请求当URL参数中存在`&`字符时，不要使用`GET`方法提交，因为后端获取参数值的时候会因为`&`当作是另外一个参数

参数

全局参数URL

请求

`http://testnet.io:3200/pdf?url=https://360.cn&width=900&height=800`

响应

```
渲染后的HTML文本
```

说明

```
渲染后的HTML文本
```

保存目录

浏览器


效果

![koa-puppeteer](https://raw.githubusercontent.com/jiguang7/koa-puppeteer/master/render/WX20181123-040208%402x.png)

















