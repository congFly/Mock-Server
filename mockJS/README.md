### 怎么使用？


> webpack --watch 代码监听
> npm start 启动node服务
> package.json 文件里有配置
> 然后访问localhost：8181


> router文件
> node index.js 启动服务
> 然后访问localhost：8083
**相信大家都存在这样的一个困扰,在前后端分离的大环境下,
前端需要后端的接口去完成页面的渲染,
但是大部分的情况下,前后端需要同时进行开发,
这种情况下,后端还没完成数据输出，前端只好写静态模拟数据。**

### 那么问题就来了

- 数据太长了，将数据写在js文件里，完成后挨个改url。

- 某些逻辑复杂的代码，加入或去除模拟数据时得小心翼翼。

- 想要尽可能还原真实的数据，要么编写更多代码，要么手动修改模
拟数据。

- 特殊的格式，例如IP,随机数，图片，地址，需要去收集。

****

##### 前几天看到mock.js的一些介绍,然后自己写了个案列跑起来了,发现还是比较实用的,所以这边整理出文章,推荐给大家

[mock案例-github地址](https://github.com/ToNiQian/mockjs)

### 1.mock是什么？

[mock官网](http://mockjs.com/)

> ![mock官网介绍截图](http://upload-images.jianshu.io/upload_images/2701853-5f70765db4e93526.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

****

### 2.mock可以模拟哪些数据?

- string
- number
- bool
- array
- object
- guid
- id
- title 
- paragraph
- image
- address
- date
- time
- url
- email
- ip
- regexp

***

**[mock示例文档](http://mockjs.com/examples.html)**

**直接附上代码**

```
// 使用 Mock
let Mock = require('mockjs');
Mock.mock('http://1.json','get',{
    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
    'list|1-3': [{
        // 属性 sid 是一个自增数，起始值为 1，每次增 1
        'sid|+1': 1,
        // 属性 userId 是一个5位的随机码
        'userId|5': '',
        // 属性 sex 是一个bool值
        "sex|1-2": true,
        // 属性 city对象 是对象值中2-4个的值
        "city|2-4": {
            "110000": "北京市",
            "120000": "天津市",
            "130000": "河北省",
            "140000": "山西省"
        },
        //属性 grade 是数组当中的一个值
        "grade|1": [
            "1年级",
            "2年级",
            "3年级"
        ],
        //属性 guid 是唯一机器码
        'guid': '@guid',
        //属性 id 是随机id
        'id': '@id',
        //属性 title 是一个随机长度的标题
        'title': '@title()',
        //属性 paragraph 是一个随机长度的段落
        'paragraph': '@cparagraph',
        //属性 image 是一个随机图片 参数分别为size, background, text
        'image': "@image('200x100', '#4A7BF7', 'Hello')",
        //属性 address 是一个随机地址
        'address': '@county(true)',
        //属性 date 是一个yyyy-MM-dd 的随机日期
        'date': '@date("yyyy-MM-dd")',
        //属性 time 是一个 size, background, text 的随机时间
        'time': '@time("HH:mm:ss")',
        //属性 url 是一个随机的url
        'url': '@url',
        //属性 email 是一个随机email
        'email': '@email',
        //属性 ip 是一个随机ip
        'ip': '@ip',
        //属性 regexp 是一个正则表达式匹配到的值 如aA1
        'regexp': /[a-z][A-Z][0-9]/,
    }]
})
```

***

### 3.如何拦截ajax请求

**[mock文档](https://github.com/nuysoft/Mock/wiki/Mock.mock)**

```
Mock.mock( rurl, rtype, template )
 
如 Mock.mock('1.json','get',{
   'sid|+1': 1,
} )
记录数据模板。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，
将根据数据模板 template 生成模拟数据，并作为响应数据返回。
```

**注:从 1.0 开始，Mock.js 通过覆盖和模拟原生 XMLHttpRequest 的行为来拦截 Ajax 请求，不再依赖于第三方 Ajax 工具库（例如 jQuery、Zepto 等）。**

### 4.案例代码

**[mock案例-github地址](https://github.com/ToNiQian/mockjs)**

> 用webpack 搭建了一个环境,mock文件里面放入跟后端定义好的接口模型和配置入口文件 引入需要的mock.js 文件 

```
process.env.NODE_ENV=='mock' && require('./mock/1.js');
process.env.NODE_ENV=='mock' && require('./mock/2.js');
var $ = require('jquery');
$(function () {
    /**
     * 请求1 get 请求
     */
    $.ajax({
        url: 'http://1.json',
        type: 'get'
    }).done(function(data,status){
        console.log('我是请求1'+data)
    })

    /**
     * 请求2 post 请求
     */
    $.ajax({
        url: 'http://2.json',
        type: 'post'
    }).done(function(data,status){
        console.log('我是请求2'+data)
    })
})
```

> ![项目截图](http://upload-images.jianshu.io/upload_images/2701853-07c4e390b25f095e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 ***

### 5. 如何在后端接口完成的时候,取消mock数据

```
new webpack.DefinePlugin({
       'process.env': {
            NODE_ENV: '"mock"'
       }
}),
process.env.NODE_ENV=='mock' && require('./mock/1.js');
process.env.NODE_ENV=='mock' && require('./mock/2.js');
```

> **根据webpack环境,在需要mock的时候,配置环境为mock,
在不需要mock的时候,只需要修改node_env 环境就可以了
无需注释代码,就可以完美解决后端接口还没完成的情况。**