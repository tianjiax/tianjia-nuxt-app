# Nuxt开发相关

## Nuxt搭建

NuxtJS 让你构建你的下一个 Vue.js 应用程序变得更有信心。这是一个 开源 的框架，让 web 开发变得简单而强大。

- [官方文档](https://nuxtjs.org/)
- [中文文档](https://www.nuxtjs.cn/)

## 注意点

### 搭建

rendering mode优先使用Universal，Universal 和 Spa 的区别也恰好就在于对seo的实现存在差异

> 以下是我的项目配置，可以简单参考

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
            "port": "3001"
        }
    }
}
```

#### 生命周期内window对象的调用

> [参考文章](https://blog.csdn.net/qq_38290251/article/details/106519985)

![image](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy81NTMxMjExLWQxYTNlNWIzNmVlMDNmMDgucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvNDYwL2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

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
    'ant-design-vue/dist/antd.css'
  ],
  
  ...
}

```

#### 配置全局的loaders

./nuxt.config.js 文件

```js
export default {
  ...

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: [
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, './src')
                ],
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
  }
}

```

#### 页面独立的head
```
// TODO
// 组件
export default {
    name:"",
    
}
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

> [参考文章](https://blog.csdn.net/qq_38290251/article/details/106519985)

安装依赖

```
npm install @nuxtjs/axios @nuxtjs/proxy --save
```

./nuxt.config.js

```
module.exports = {
  ...
  modules: [ '@nuxtjs/axios' ], // 不需要加入@nuxtjs/proxy
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

#### 使用less

```
// TODO
// 控制台
npm install less less-loader --save-dev

// 组件内
<style lang="less" scoped>
.search-box {
  display: flex;
  width: 100%;
  a {
    color: red;
  }
}
</style>
```

#### 跳转

> nuxt 的路由跳转不建议用 router-link ，推荐用 nuxt-link

```
// 常规不传参
<nuxt-link to="/">首页</nuxt-link>

// params路由传参，搜索页使用this.$route.params.keyword获取
<nuxt-link :to="{ name: 'Detail', params: { keyword: item.name }}">搜索页</nuxt-link>

// query跳转链接传参，课程管理页使用this.$route.query.id获取
<nuxt-link :to="{ path:'/detail', query: { id: 1 }}">课程管理</nuxt-link>
```
