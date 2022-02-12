# Nuxt开发相关

## Nuxt搭建

NuxtJS 让你构建你的下一个 Vue.js 应用程序变得更有信心。这是一个 开源 的框架，让 web 开发变得简单而强大。

- [官方文档](https://nuxtjs.org/)
- [中文文档](https://www.nuxtjs.cn/)

## 注意点

### 搭建

rendering mode优先使用Universal，Universal 和 Spa 的区别也恰好就在于对seo的实现存在差异

以下是我的项目配置，可以简单参考

```text
✨  Generating Nuxt.js project in tianjia-demo                                              // 是否在当前文件夹创建
? Project name: tianjia-nuxt                                                                // 项目名字
? Programming language: TypeScript                                                          // 程序设计语言:ts
? Package manager: Yarn                                                                     // 包管理器:yarn  
? UI framework: Ant Design Vue                                                              // UI框架:Ant Design Vue
? Nuxt.js modules: (Press <space> to select, <a> to toggle all, <i> to invert selection)    // Nuxt.js模块，选第一个
? Linting tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)      // 代码检查工具:我都用的esline
? Testing framework: None                                                                   // 测试框架
? Rendering mode: Universal (SSR / SSG)                                                     // 渲染模式:Universal(不使用单页spa模式，因为无法完成seo搜索引擎的收录)
? Deployment target: Server (Node.js hosting)                                               // 部署目标:node服务端                                       
? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)  // 开发工具:我用的vscode
? What is your GitHub username? tianjiax                                                    // GitHub名字，用于后续的GitHub相关操作
? Version control system: Git                                                               // 使用的代码管理根据：git
```

> 启动

```text
 To build & start for production:

        cd tianjia-demo
        yarn build
        yarn start

```

### 开发相关问题

#### 自定义配置IP地址和端口

./package.json 文件

```json
{
    ...
    "config": {
        "nuxt": {
            "host": "0.0.0.0",
            "port": "8888"
        }
    }
}
```

#### 生命周期内window对象的调用

[参考文章](https://blog.csdn.net/qq_38290251/article/details/106519985)

![image](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy81NTMxMjExLWQxYTNlNWIzNmVlMDNmMDgucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvNDYwL2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

./layouts/default.vue

```js
export default {
  asyncData() {
    console.log(window) // 服务端报错
  },
  fetch() {
    console.log(window) // 服务端报错
  },
  created () {
    console.log(window) // undefined
  },
  mounted () {
    console.log(window) // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
  }
}
```

#### 配置全局的css

./nuxt.config.js 文件

```js
export default {
  ...

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    '@/assets/css/global.less'
  ],
  
  ...
}

```


#### 使用less

```js
// package.json
{
    ...
    "dependencies": {
        ...
        "less": "^3.9.0",
        "less-loader": "^5.0.0"
    },
    ...
}

// 控制台
yarn

// 组件内 ./pages/detail.vue
<style lang="less" scoped>
.content {
  h2 {
    font-size: 20px;
    color: @orange;
  }
}
</style>
```

#### 配置全局less变量

控制台
```js
yarn add @nuxtjs/style-resources -D
```

./assets/css/variable.less

```css
@white: #ffffff;
@orange: orange;
...
```

./nuxt.config.js 文件

```js
export default {
    ...
    modules: [
        '@nuxtjs/style-resources'
    ],
    
    styleResources:{
        less:[
          './assets/css/variable.less'
        ]
    },
    ...
}

```

./pages/detail.vue

```js
...
<style lang="less" scoped>
.content {
  background-color: #cccccc;
  h2 {
    font-size: 20px;
    color: @orange;
  }
}
</style>
```

#### 配置全局的loaders

./nuxt.config.js 文件

```js
export default {
  ...

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    }
}

```

#### 动态路由
在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件 或 目录。
[官网路由文档](https://www.nuxtjs.cn/guide/routing)

以下目录结构：

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

Nuxt.js 生成对应的路由配置表为：

```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

你会发现名称为 users-id 的路由路径带有 :id? 参数，表示该路由是可选的。如果你想将它设置为必选的路由，需要在 users/_id 目录内创建一个 index.vue 文件。


#### 自定义布局

可通过添加 layouts/default.vue 文件来扩展应用的默认布局。

./layouts/default.vue 

```html
// 公共头尾，<nuxt />为内容块
<template>
    <header />
    <nuxt />
    <footer />
</template>
```

可以通过编辑 layouts/error.vue 文件来定制化错误页面.

./layouts/error.vue

```html
<template>
    <div class="container">
        <h1 v-if="error.statusCode === 404">页面不存在</h1>
        <h1 v-else>应用发生错误异常</h1>
        <nuxt-link to="/">首 页</nuxt-link>
    </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blog' // 你可以为错误页面指定自定义的布局
  }
</script>
```


#### 如何在vuex的actions内使用router，拿到全部的vuex状态？

vuex存放在/store内，具体使用[参考文档](https://www.nuxtjs.cn/guide/vuex-store)
```js

...

export const actions = {
    async addToCart(ctx, formData) {
        let isLogin = true;
        // 登录状态判定
        isLogin = localStorage.getItem("token");
        // 使用router
        const router = window.$nuxt.$router;
        if (!isLogin) {
            router.push("/login");
            return;
        }
        // 拿到全部的vuex状态
        let baseStoreState = ctx.rootState;
        ...
    }
}

...

```

#### axios的全局配置

[参考文章](https://blog.csdn.net/qq_38290251/article/details/106519985)

安装依赖

```
npm install @nuxtjs/axios @nuxtjs/proxy --save
```

./nuxt.config.js

```
module.exports = {
  ...
  modules: [ 
    ...
    '@nuxtjs/axios'
  ], // 不需要加入@nuxtjs/proxy
  axios: {
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true,
  },
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:2001', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
    },
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    ...
    '@/plugins/axios'
  ],
  ...
}
```

组件内使用

```
export default {
    fetch ({ app }) {
        console.log(app.$axios)
    },
    asyncData ({ app }) {
        console.log(app.$axios)
    },
    created () {
        console.log(this.$axios)
    }
}

```

到此为止，我们并不需要在 plugins 配置 axios，但是如果要设置全局拦截器，那么就要新建一个/plugins/axios.js，同时在nuxt.config.js 文件中引入

```
export default function (app) {
  let axios = app.$axios; 
  // 基本配置
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
 
  // 请求回调
  axios.onRequest(config => {})
 
  // 返回回调
  axios.onResponse(res => {})
 
  // 错误回调
  axios.onError(error => {})
}
```

实际使用请看 ./page/axiosDemo.vue

#### 跳转

nuxt 的路由跳转不建议用 router-link ，推荐用 nuxt-link。具体使用请看demo内pages/nuxtLinkDemo.vue

```
// 常规不传参 = this.$router.push("/detail");
<nuxt-link to="/detail">详情</nuxt-link>

// params路由传参 = this.$router.push({name: 'detail', params: { keyword: searchKeyword }})，搜索页使用this.$route.params.keyword获取
<nuxt-link :to="{ name: 'detail', params: { keyword: searchKeyword }}">搜索页</nuxt-link>

// query跳转链接传参 = this.$router.push({ path: "/detail", query: { id: "1" } });，课程管理页使用this.$route.query.id获取
<nuxt-link :to="{ path:'/detail', query: { id: 1 }}">课程管理</nuxt-link>
```


#### 中间件

中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。

每一个中间件应放置在 middleware/ 目录。文件名的名称将成为中间件名称 (middleware/auth.js将成为 auth 中间件)。

```js
export default function (context) {
    context.userAgent = process.server
        ? context.req.headers['user-agent']
        : navigator.userAgent
}

// context的值
// $config: {_app: {…}}
// app: {head: {…}, router: VueRouter, nuxt: {…}, render: ƒ, data: ƒ, …}
// base: "/"
// env: {}
// error: ƒ ()
// from: {name: 'detail', meta: Array(1), path: '/detail', hash: '', query: {…}, …}
// isDev: true
// isHMR: false
// isStatic: false
// next: ƒ ()
// nuxtState: {layout: 'default', data: Array(1), fetch: {…}, error: null, serverRendered: true, …}
// params: {}
// payload: undefined
// query: {}
// redirect: ƒ (status, path, query)
// route: {name: 'index', meta: Array(1), path: '/', hash: '', query: {…}, …}
// userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36"
// _errored: false
// _redirected: false
```

全局使用 ./nuxt.config.js

```js
module.exports = {
  router: {
    middleware: 'auth'
  }
}
```

您也可以将 middleware 添加到指定的布局或者页面:

pages/index.vue 或者 layouts/default.vue

```js
export default {
  middleware: 'auth'
}
```


#### 开发环境与生产环境的全局变量设置

```js

let preUrl = "";

// 开发环境
if (process.env.NODE_ENV == "development") {
    preUrl = DEVELOPMENT_URL;
}
// 生产环境
else if (process.env.NODE_ENV == "production") {
    preUrl = PRODUCTION_URL;
}

export const PRE_URL = preUrl 

```
